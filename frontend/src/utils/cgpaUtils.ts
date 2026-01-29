import type { SemesterData, SubjectResult } from "@/types/types";

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

export const calculateSGPA = (
  subjects: SubjectResult[],
  defaultCreditsPerSubject: number = 4,
): number => {
  if (subjects.length === 0) return 0;

  let totalCredits = 0;
  let totalGradePoints = 0;

  subjects.forEach((subject) => {
    const gradePoint = parseFloat(String(subject.eugpa)) || 0;
    const credits = defaultCreditsPerSubject; 

    totalGradePoints += gradePoint * credits;
    totalCredits += credits;
  });

  if (totalCredits === 0) return 0;
  return totalGradePoints / totalCredits;
};

export const calculateCGPA = (
  semesters: SemesterData[],
  creditsPerSemester?: Record<number, number>,
): CGPAResult => {
  if (semesters.length === 0) {
    return { cgpa: 0, totalCredits: 0, totalGradePoints: 0 };
  }

  let totalCredits = 0;
  let totalGradePoints = 0;

  semesters.forEach((sem) => {
    // Using provided credits or default to number of subjects * 4
    const semCredits =
      creditsPerSemester?.[sem.semester] || sem.subjects.length * 4;
    const sgpa = sem.sgpa;

    totalGradePoints += sgpa * semCredits;
    totalCredits += semCredits;
  });

  if (totalCredits === 0) {
    return { cgpa: 0, totalCredits: 0, totalGradePoints: 0 };
  }

  return {
    cgpa: totalGradePoints / totalCredits,
    totalCredits,
    totalGradePoints,
  };
};

export const calculateProgressiveCGPA = (
  semesters: SemesterData[],
  creditsPerSemester?: Record<number, number>,
): SemesterCGPA[] => {
  const sortedSemesters = [...semesters].sort(
    (a, b) => a.semester - b.semester,
  );
  let cumulativeCredits = 0;
  let cumulativeGradePoints = 0;

  return sortedSemesters.map((sem) => {
    const semCredits =
      creditsPerSemester?.[sem.semester] || sem.subjects.length * 4;
    const sgpa = sem.sgpa;

    cumulativeGradePoints += sgpa * semCredits;
    cumulativeCredits += semCredits;

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
  const { cgpa } = calculateCGPA(semesters);
  return cgpa.toFixed(3);
};