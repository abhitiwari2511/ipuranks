import type {
  SubjectResult,
  SemesterData,
  CumulativeData,
} from "@/types/types";
import { calculateProgressiveCGPA } from "./cgpaUtils";

// helper to filter the subjects fail ones.
const filterUniqueSubjects = (subjects: SubjectResult[]): SubjectResult[] => {
  const subjectMap = new Map<string, SubjectResult>();

  subjects.forEach((subject) => {
    const key = subject.papercode;
    const existing = subjectMap.get(key);
    const currentMarks = parseFloat(subject.moderatedprint) || 0;

    if (!existing) {
      subjectMap.set(key, subject);
    } else {
      const existingMarks = parseFloat(existing.moderatedprint) || 0;

      //agr pass hai to wo rkho
      if (currentMarks >= 40 && existingMarks < 40) {
        subjectMap.set(key, subject);
      }
      // dono fail to jo jyada
      else if (
        (currentMarks >= 40 && existingMarks >= 40) ||
        (currentMarks < 40 && existingMarks < 40)
      ) {
        if (currentMarks > existingMarks) {
          subjectMap.set(key, subject);
        }
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

      const totalMarks = passedSubjects.reduce((sum, s) => {
        const moderated = parseFloat(s.moderatedprint) || 0;
        return sum + moderated;
      }, 0);

      const maxMarks = passedSubjects.length * 100; // Only count passed subjects
      const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

      // sgpa calculation
      const totalGradePoints = passedSubjects.reduce((sum, s) => {
        return sum + (s.eugpa || 0);
      }, 0);
      const sgpa =
        passedSubjects.length > 0
          ? totalGradePoints / passedSubjects.length
          : 0;

      return {
        semester,
        subjects: allSubjectsForDisplay,
        sgpa,
        totalMarks,
        maxMarks,
        percentage,
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
      performance: parseFloat(sem.sgpa.toFixed(1)),
    })),
  };
};
