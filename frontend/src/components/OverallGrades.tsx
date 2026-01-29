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
import { Award, TrendingUp, BookOpen } from "lucide-react";

interface OverallGradesProps {
  semesters: SemesterData[];
}

const OverallGrades = ({ semesters }: OverallGradesProps) => {
  const progressiveCGPA = calculateProgressiveCGPA(semesters);
  const sortedSemesters = [...semesters].sort(
    (a, b) => a.semester - b.semester,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl bg-zinc-900 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white uppercase tracking-wide">
            <Award className="w-5 h-5 text-emerald-400" />
            Semester Grades Overview
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Your performance grades across all semesters
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedSemesters.map((sem, index) => {
              const cgpaData = progressiveCGPA[index];
              const sgpaGrade = sgpaToGrade(sem.sgpa);

              return (
                <motion.div
                  key={sem.semester}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 bg-zinc-800/40 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all hover:bg-zinc-800/60"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">
                      Sem {sem.semester}
                    </h4>
                    <Badge
                      className={`text-sm font-bold px-3 py-1 ${getGradeBgColor(sgpaGrade)}`}
                    >
                      {sgpaGrade}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 text-sm flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> SGPA
                      </span>
                      <span className="text-lime-400 font-bold text-lg">
                        {sem.sgpa.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 text-sm flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> CGPA
                      </span>
                      <span className="text-cyan-400 font-bold text-lg">
                        {cgpaData?.cgpa.toFixed(2) || "N/A"}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-zinc-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600">Percentage</span>
                        <span className="text-zinc-400">
                          {sem.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-zinc-600">Marks</span>
                        <span className="text-zinc-400">
                          {sem.totalMarks}/{sem.maxMarks}
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
