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

// Filter to keep best attempt for each subject, passed only
const getUniquePassedSubjects = (semester: SemesterData) =>
  filterUniqueSubjects(semester.subjects)
    .filter((s) => (parseFloat(s.moderatedprint) || 0) >= 40)
    .map((s) => ({
      marks: parseFloat(s.moderatedprint) || 0,
      papercode: s.papercode,
    }));

export const calculateProgressiveCGPA = (
  semesters: SemesterData[],
): SemesterCGPA[] => {
  const sortedSemesters = [...semesters].sort(
    (a, b) => a.semester - b.semester,
  );
  let cumulativeCredits = 0;
  let cumulativeGradePoints = 0;

  return sortedSemesters.map((sem) => {
    const passedSubjects = getUniquePassedSubjects(sem);

    let semCredits = 0;
    let semGradePoints = 0;
    passedSubjects.forEach((s) => {
      const credits = getCredits(s.papercode);
      const gradePoint = marksToGradePoint(s.marks);
      semCredits += credits;
      semGradePoints += gradePoint * credits;
    });

    cumulativeGradePoints += semGradePoints;
    cumulativeCredits += semCredits;

    const sgpa = semCredits > 0 ? semGradePoints / semCredits : 0;
    const cgpa =
      cumulativeCredits > 0 ? cumulativeGradePoints / cumulativeCredits : 0;

    return {
      semester: sem.semester,
      sgpa,
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
