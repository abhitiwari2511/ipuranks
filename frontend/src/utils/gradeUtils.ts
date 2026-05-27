export const marksToGrade = (marks: number): string => {
  if (marks >= 90 && marks <= 100) return "O";
  if (marks >= 75 && marks <= 89) return "A+";
  if (marks >= 65 && marks <= 74) return "A";
  if (marks >= 55 && marks <= 64) return "B+";
  if (marks >= 50 && marks <= 54) return "B";
  if (marks >= 45 && marks <= 49) return "C";
  if (marks >= 40 && marks <= 44) return "P";
  return "F";
};

export const sgpaToGrade = (sgpa: number): string => {
  if (sgpa >= 9.0) return "O";
  if (sgpa >= 7.5) return "A+";
  if (sgpa >= 6.5) return "A";
  if (sgpa >= 5.5) return "B+";
  if (sgpa >= 5.0) return "B";
  if (sgpa >= 4.5) return "C";
  if (sgpa >= 4.0) return "P";
  return "F";
};

export const getGradeColor = (grade: string): string => {
  const colors: Record<string, string> = {
    O: "text-emerald-300",
    "A+": "text-green-300",
    A: "text-teal-300",
    "B+": "text-amber-300",
    B: "text-orange-300",
    C: "text-orange-300",
    P: "text-rose-300",
    F: "text-red-300",
  };
  return colors[grade] || "text-gray-500";
};

export const getGradeBgColor = (grade: string): string => {
  const colors: Record<string, string> = {
    O: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
    "A+": "bg-green-500/15 text-green-200 border-green-400/30",
    A: "bg-teal-500/15 text-teal-200 border-teal-400/30",
    "B+": "bg-amber-500/15 text-amber-200 border-amber-400/30",
    B: "bg-orange-500/15 text-orange-200 border-orange-400/30",
    C: "bg-orange-500/15 text-orange-200 border-orange-400/30",
    P: "bg-rose-500/15 text-rose-200 border-rose-400/30",
    F: "bg-red-500/15 text-red-200 border-red-400/30",
  };
  return colors[grade] || "bg-slate-800 text-slate-200 border-slate-700";
};
