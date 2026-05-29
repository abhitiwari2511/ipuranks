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
import BookIcon from "@/components/ui/book-icon";
import { marksToGrade, getGradeBgColor } from "@/utils/gradeUtils";

interface SemesterDetailsProps {
  semester: SemesterData;
}

const SemesterDetails = ({ semester }: SemesterDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="border-b border-slate-800/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/15 rounded-xl">
                <BookIcon size={18} className="text-indigo-200" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-slate-100 tracking-tight font-display">
                  Semester {semester.semester} Statistics
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Detailed subject-wise proficiency breakdown
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-indigo-500/15 text-indigo-200 border-indigo-500/30 text-xs px-3 py-1 border">
                SGPA: {semester.sgpa.toFixed(2)}
              </Badge>
              <Badge className="bg-violet-500/15 text-violet-200 border-violet-500/30 text-xs px-3 py-1 border">
                {semester.percentage.toFixed(2)}%
              </Badge>
              <Badge className="bg-slate-800/60 text-slate-200 border-slate-700/70 text-xs px-3 py-1 border">
                {semester.totalMarks} / {semester.maxMarks}
              </Badge>
              <Badge className="bg-emerald-500/15 text-emerald-200 border-emerald-500/30 text-xs px-3 py-1 border">
                Credits: {semester.semesterCredits} /{" "}
                {semester.semesterCreditsPossible ?? 0}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/70">
                  <th className="text-left p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="text-center p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    Internal
                  </th>
                  <th className="text-center p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    External
                  </th>
                  <th className="text-center p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-center p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {semester.subjects.map((subject, index) => {
                  const internal = parseInt(subject.minorprint) || 0;
                  const external = parseInt(subject.majorprint) || 0;
                  const total = parseFloat(subject.moderatedprint) || 0;
                  const grade = marksToGrade(total);
                  const hasReappear = subject.moderatedprint?.includes("*");

                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="border-b border-slate-800/60 hover:bg-slate-900/60 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-slate-100 text-sm">
                            {subject.papername}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono-nums mt-0.5">
                            {subject.papercode}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-slate-200 font-medium font-mono-nums text-sm">
                          {internal}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-slate-200 font-medium font-mono-nums text-sm">
                          {external}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-slate-100 font-bold font-mono-nums text-sm">
                          {total}
                          {hasReappear && (
                            <span className="text-amber-300 ml-0.5">*</span>
                          )}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Badge
                          className={`${getGradeBgColor(grade)} font-semibold text-xs border`}
                        >
                          {grade}
                        </Badge>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SemesterDetails;
