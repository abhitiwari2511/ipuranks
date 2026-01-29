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
    O: "text-emerald-400",
    "A+": "text-green-400",
    A: "text-lime-400",
    "B+": "text-yellow-400",
    B: "text-amber-400",
    C: "text-orange-400",
    P: "text-orange-500",
    F: "text-red-500",
  };
  return colors[grade] || "text-gray-400";
};

export const getGradeBgColor = (grade: string): string => {
  const colors: Record<string, string> = {
    O: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "A+": "bg-green-500/20 text-green-400 border-green-500/30",
    A: "bg-lime-500/20 text-lime-400 border-lime-500/30",
    "B+": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    B: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    C: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    P: "bg-orange-600/20 text-orange-500 border-orange-600/30",
    F: "bg-red-500/20 text-red-500 border-red-500/30",
  };
  return colors[grade] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
};
