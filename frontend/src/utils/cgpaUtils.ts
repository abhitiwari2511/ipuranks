import type { SemesterData } from "@/types/types";
import {
  marksToGradePoint,
  getCredits,
  filterUniqueSubjects,
} from "./resultProcessing";

export interface CGPAResult {
  cgpa: number;
  totalCredits: number;
  totalGradePoints: number;
}

export interface SemesterCGPA {
  semester: number;
  sgpa: number;
  cgpa: number;
  semesterCredits: number;
  cumulativeCreditsEarned: number;
  cumulativeCredits: number;
  // possible credits (sum of all unique subject credits)
  semesterCreditsPossible?: number;
  cumulativeCreditsPossible?: number;
}

// For CGPA calculation use latest attempt per subject (unique) and include all subjects
// in the denominator (credits for the subject), while grade points come from that
// latest attempt (may be zero for failed attempts).
const getUniqueLatestAttempts = (subjects: SemesterData[]) =>
  filterUniqueSubjects(subjects.flatMap((sem) => sem.subjects)).map((s) => ({
    marks: parseFloat(s.moderatedprint) || 0,
    papercode: s.papercode,
  }));

export const calculateProgressiveCGPA = (
  semesters: SemesterData[],
): SemesterCGPA[] => {
  const sortedSemesters = [...semesters].sort(
    (a, b) => a.semester - b.semester,
  );
  return sortedSemesters.map((sem, index) => {
    const semestersUpToNow = sortedSemesters.slice(0, index + 1);
    const uniqueUpToNow = getUniqueLatestAttempts(semestersUpToNow);
    const semesterSubjects = filterUniqueSubjects(sem.subjects).map((s) => ({
      marks: parseFloat(s.moderatedprint) || 0,
      papercode: s.papercode,
    }));

    let cumulativeCreditsEarned = 0;
    let cumulativeGradePoints = 0;
    let semCredits = 0;
    let cumulativePossibleCredits = 0;
    let semPossibleCredits = 0;

    // cumulative sums: include all unique subjects up to now in denominator
    uniqueUpToNow.forEach((subject) => {
      const credits = getCredits(subject.papercode);
      const gradePoint = marksToGradePoint(subject.marks);
      cumulativeGradePoints += gradePoint * credits;
      if (subject.marks >= 40) {
        cumulativeCreditsEarned += credits;
      }
    });

    // Only count semester credits for passed subjects (earned credits)
    semesterSubjects
      .filter((subject) => subject.marks >= 40)
      .forEach((subject) => {
        semCredits += getCredits(subject.papercode);
      });

    // compute possible credits (unique counts)
    cumulativePossibleCredits = uniqueUpToNow.reduce(
      (sum, s) => sum + getCredits(s.papercode),
      0,
    );
    semPossibleCredits = filterUniqueSubjects(sem.subjects).reduce(
      (sum, s) => sum + getCredits(s.papercode),
      0,
    );

    const cgpa =
      cumulativePossibleCredits > 0
        ? cumulativeGradePoints / cumulativePossibleCredits
        : 0;

    return {
      semester: sem.semester,
      sgpa: sem.sgpa,
      cgpa,
      semesterCredits: semCredits,
      cumulativeCreditsEarned,
      cumulativeCredits: cumulativePossibleCredits,
      semesterCreditsPossible: semPossibleCredits,
      cumulativeCreditsPossible: cumulativePossibleCredits,
    };
  });
};

export const getOverallCGPA = (semesters: SemesterData[]): string => {
  const progressive = calculateProgressiveCGPA(semesters);
  const last = progressive[progressive.length - 1];
  return last ? last.cgpa.toFixed(3) : "0.000";
};
