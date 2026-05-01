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
  cumulativeCredits: number;
}

// Best attempt per subject across all attempts
const getBestAttemptSubjects = (subjects: SemesterData[]) =>
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
    const bestAttempts = getBestAttemptSubjects(semestersUpToNow);
    const semesterSubjects = filterUniqueSubjects(sem.subjects).map((s) => ({
      marks: parseFloat(s.moderatedprint) || 0,
      papercode: s.papercode,
    }));

    let cumulativeCredits = 0;
    let cumulativeGradePoints = 0;
    let semCredits = 0;

    bestAttempts.forEach((subject) => {
      const credits = getCredits(subject.papercode);
      const gradePoint = marksToGradePoint(subject.marks);
      cumulativeCredits += credits;
      cumulativeGradePoints += gradePoint * credits;
    });

    semesterSubjects.forEach((subject) => {
      semCredits += getCredits(subject.papercode);
    });

    const cgpa =
      cumulativeCredits > 0 ? cumulativeGradePoints / cumulativeCredits : 0;

    return {
      semester: sem.semester,
      sgpa: sem.sgpa,
      cgpa,
      semesterCredits: semCredits,
      cumulativeCredits,
    };
  });
};

export const getOverallCGPA = (semesters: SemesterData[]): string => {
  const progressive = calculateProgressiveCGPA(semesters);
  const last = progressive[progressive.length - 1];
  return last ? last.cgpa.toFixed(3) : "0.000";
};
