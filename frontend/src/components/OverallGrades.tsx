import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SemesterData } from "@/types/types";
import { sgpaToGrade, getGradeBgColor } from "@/utils/gradeUtils";
import { calculateProgressiveCGPA } from "@/utils/cgpaUtils";
import TrophyIcon from "@/components/ui/trophy-icon";
import ChartLineIcon from "@/components/ui/chart-line-icon";
import BookIcon from "@/components/ui/book-icon";

interface OverallGradesProps {
  semesters: SemesterData[];
}

const OverallGrades = ({ semesters }: OverallGradesProps) => {
  const progressiveCGPA = calculateProgressiveCGPA(semesters);
  const sortedSemesters = [...semesters].sort(
    (a, b) => a.semester - b.semester,
  );
  const lastProg = progressiveCGPA[progressiveCGPA.length - 1];
  const overallCreditsEarned = lastProg?.cumulativeCredits || 0;
  const overallCreditsPossible = lastProg?.cumulativeCreditsPossible || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="border-b border-slate-800/70">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2.5 text-lg font-semibold text-slate-100 tracking-tight font-display">
                <div className="p-1.5 bg-indigo-500/15 rounded-lg">
                  <TrophyIcon size={16} className="text-indigo-200" />
                </div>
                Semester Performance Grades
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm mt-1">
                A comprehensive overview of your achievements to date
              </CardDescription>
            </div>
            <Badge className="bg-emerald-500/15 text-emerald-200 border-emerald-500/30 text-xs px-3 py-1 border self-start">
              Total Credits: {overallCreditsEarned}/{overallCreditsPossible}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedSemesters.map((sem, index) => {
              const cgpaData = progressiveCGPA[index];
              const sgpaGrade = sgpaToGrade(sem.sgpa);

              return (
                <motion.div
                  key={sem.semester}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 bg-slate-950/70 rounded-md border border-slate-800/70 hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-slate-100 font-display">
                      Sem {sem.semester}
                    </h4>
                    <Badge
                      className={`text-xs font-bold px-2.5 py-0.5 border ${getGradeBgColor(sgpaGrade)}`}
                    >
                      {sgpaGrade}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm flex items-center gap-1.5">
                        <BookIcon size={14} /> SGPA
                      </span>
                      <span className="text-emerald-300 font-bold text-lg font-mono-nums">
                        {sem.sgpa.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm flex items-center gap-1.5">
                        <ChartLineIcon size={14} /> CGPA
                      </span>
                      <span className="text-violet-300 font-bold text-lg font-mono-nums">
                        {cgpaData?.cgpa.toFixed(2) || "N/A"}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-slate-800/70">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Percentage</span>
                        <span className="text-slate-200 font-medium font-mono-nums">
                          {sem.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1.5">
                        <span className="text-slate-400">Marks</span>
                        <span className="text-slate-200 font-medium font-mono-nums">
                          {sem.totalMarks}/{sem.maxMarks}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1.5">
                        <span className="text-slate-400">Credits</span>
                        <span className="text-slate-200 font-medium font-mono-nums">
                          {cgpaData?.semesterCredits ?? sem.semesterCredits}/
                          {cgpaData?.semesterCreditsPossible ??
                            sem.semesterCreditsPossible ??
                            0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1.5">
                        <span className="text-slate-400">Total Credits</span>
                        <span className="text-emerald-300 font-medium font-mono-nums">
                          {cgpaData?.cumulativeCredits ?? overallCreditsEarned}/
                          {cgpaData?.cumulativeCreditsPossible ??
                            overallCreditsPossible}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OverallGrades;
