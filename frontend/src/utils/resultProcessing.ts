import type {
  SubjectResult,
  SemesterData,
  CumulativeData,
} from "@/types/types";
import { calculateProgressiveCGPA } from "./cgpaUtils";
import subjectCreditsData from "@/data/subjectCredits.json";

const subjectCredits: Record<string, number> = subjectCreditsData;

const normalizePaperCode = (code: string): string =>
  code.replace(/-/g, "").toUpperCase();

const subjectCreditsExact: Record<string, number> = {};
const subjectCreditsNormalized: Record<string, number> = {};

Object.entries(subjectCredits).forEach(([code, credits]) => {
  const upper = code.toUpperCase();
  if (subjectCreditsExact[upper] === undefined) {
    subjectCreditsExact[upper] = credits;
  }

  const normalized = normalizePaperCode(code);
  if (subjectCreditsNormalized[normalized] === undefined) {
    subjectCreditsNormalized[normalized] = credits;
  }
});

//total marks to IPU grade point
export const marksToGradePoint = (marks: number): number => {
  if (marks >= 90) return 10;
  if (marks >= 75) return 9;
  if (marks >= 65) return 8;
  if (marks >= 55) return 7;
  if (marks >= 50) return 6;
  if (marks >= 45) return 5;
  if (marks >= 40) return 4;
  return 0;
};

// subject code ke liye credits nikalna
export const getCredits = (papercode: string): number => {
  const upper = papercode.toUpperCase();
  const normalized = normalizePaperCode(papercode);

  if (subjectCreditsExact[upper] !== undefined) {
    return subjectCreditsExact[upper];
  }

  if (subjectCreditsNormalized[normalized] !== undefined) {
    return subjectCreditsNormalized[normalized];
  }
  // Fallback: labs/practicals end with P or contain LAB → 1 credit, else 4
  if (upper.endsWith("P") || upper.includes("LAB")) return 1;
  return 4;
};

// helper to filter the subjects fail ones.
const getAttemptTimestamp = (subject: SubjectResult): number => {
  const parsedDate = Date.parse(subject.declareddate);
  if (!Number.isNaN(parsedDate)) {
    return parsedDate;
  }

  const year = Number(subject.ryear) || 0;
  const month = Number(subject.rmonth) || 0;
  return Date.UTC(year, Math.max(month - 1, 0), 1);
};

export const filterUniqueSubjects = (
  subjects: SubjectResult[],
): SubjectResult[] => {
  const subjectMap = new Map<string, SubjectResult>();

  subjects.forEach((subject) => {
    const key = normalizePaperCode(subject.papercode);
    const existing = subjectMap.get(key);

    if (!existing) {
      subjectMap.set(key, subject);
    } else {
      const existingTimestamp = getAttemptTimestamp(existing);
      const currentTimestamp = getAttemptTimestamp(subject);

      if (currentTimestamp >= existingTimestamp) {
        subjectMap.set(key, subject);
      }
    }
  });

  return Array.from(subjectMap.values());
};

export const processResultData = (
  resultData: SubjectResult[],
): SemesterData[] => {
  const semesterMap = new Map<number, SubjectResult[]>();

  resultData.forEach((result) => {
    // sem display
    const sem = result.euno;
    if (!semesterMap.has(sem)) {
      semesterMap.set(sem, []);
    }
    semesterMap.get(sem)!.push(result);
  });

  return Array.from(semesterMap.entries())
    .map(([semester, subjects]) => {
      const uniqueSubjects = filterUniqueSubjects(subjects);

      const allSubjectsForDisplay = [...subjects].sort((a, b) =>
        a.papercode.localeCompare(b.papercode),
      );

      // sirf pass wale add krna
      const passedSubjects = uniqueSubjects.filter((s) => {
        const marks = parseFloat(s.moderatedprint) || 0;
        return marks >= 40;
      });

      // total marks across all unique subjects (include failed ones)
      const totalMarks = uniqueSubjects.reduce((sum, s) => {
        const moderated = parseFloat(s.moderatedprint) || 0;
        return sum + moderated;
      }, 0);

      // Count credits only for subjects the student has passed
      const semesterCredits = passedSubjects.reduce((sum, s) => {
        return sum + getCredits(s.papercode);
      }, 0);

      // total possible credits for the semester (all unique subjects)
      const semesterCreditsPossible = uniqueSubjects.reduce((sum, s) => {
        return sum + getCredits(s.papercode);
      }, 0);

      // each subject is out of 100; count all unique subjects for possible max
      const maxMarks = uniqueSubjects.length * 100;
      const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

      // sgpa calculation: numerator = sum(Ci * Gi) for all unique subjects (Gi may be 0 for failed)
      // denominator = sum(Ci) for all unique subjects (include credits even if course is failed)
      let totalWeightedGP = 0;
      let totalCredits = 0;
      uniqueSubjects.forEach((s) => {
        const marks = parseFloat(s.moderatedprint) || 0;
        const gradePoint = marksToGradePoint(marks);
        const credits = getCredits(s.papercode);
        totalWeightedGP += gradePoint * credits;
        totalCredits += credits;
      });
      const sgpa = totalCredits > 0 ? totalWeightedGP / totalCredits : 0;

      return {
        semester,
        subjects: allSubjectsForDisplay,
        sgpa,
        totalMarks,
        maxMarks,
        percentage,
        semesterCredits,
        semesterCreditsPossible,
      };
    })
    .sort((a, b) => a.semester - b.semester);
};

// saath ka data har sem ka
export const calculateSemesterCumulativeData = (
  semesters: SemesterData[],
): CumulativeData[] => {
  const progressiveCGPA = calculateProgressiveCGPA(semesters);

  return semesters.map((_, index) => {
    const prevSems = semesters.slice(0, index + 1);
    const totalMarks = prevSems.reduce((sum, s) => sum + s.totalMarks, 0);
    const maxMarks = prevSems.reduce((sum, s) => sum + s.maxMarks, 0);
    const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
    const cgpa = progressiveCGPA[index]?.cgpa || 0;

    const semLabel =
      index === 0
        ? "Sem 1"
        : `Sem ${Array.from({ length: index + 1 }, (_, i) => i + 1).join("+")}`;

    return {
      semester: semLabel,
      marks: `${totalMarks} / ${maxMarks}`,
      percentage: percentage.toFixed(2),
      gpa: cgpa.toFixed(2),
    };
  });
};

// same year wise
export const calculateYearCumulativeData = (
  semesters: SemesterData[],
): CumulativeData[] => {
  const years: SemesterData[][] = [];
  for (let i = 0; i < semesters.length; i += 2) {
    years.push(semesters.slice(i, i + 2));
  }

  const progressiveCGPA = calculateProgressiveCGPA(semesters);

  return years.map((_, yearIndex) => {
    const allSemsUpToYear = semesters.slice(0, (yearIndex + 1) * 2);
    const totalMarks = allSemsUpToYear.reduce(
      (sum, s) => sum + s.totalMarks,
      0,
    );
    const maxMarks = allSemsUpToYear.reduce((sum, s) => sum + s.maxMarks, 0);
    const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

    // latest cgpa of sem in that year
    const lastSemIndex = Math.min(
      (yearIndex + 1) * 2 - 1,
      semesters.length - 1,
    );
    const cgpa = progressiveCGPA[lastSemIndex]?.cgpa || 0;

    const yearLabel =
      yearIndex === 0
        ? "Year 1"
        : `Year ${Array.from({ length: yearIndex + 1 }, (_, i) => i + 1).join("+")}`;

    return {
      semester: yearLabel,
      marks: `${totalMarks} / ${maxMarks}`,
      percentage: percentage.toFixed(2),
      gpa: cgpa.toFixed(2),
    };
  });
};

export const calculateCumulativeData = calculateSemesterCumulativeData;

export const generateChartData = (semesters: SemesterData[]) => {
  return {
    lineChart: semesters.map((sem) => ({
      name: `Sem ${sem.semester}`,
      SGPA: parseFloat(sem.sgpa.toFixed(2)),
      Percentage: parseFloat(sem.percentage.toFixed(2)),
    })),
    radarChart: semesters.map((sem) => ({
      semester: `S${sem.semester}`,
      performance: parseFloat(sem.sgpa.toFixed(2)),
    })),
  };
};
