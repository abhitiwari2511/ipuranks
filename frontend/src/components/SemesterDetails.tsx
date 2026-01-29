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
import { BookOpen } from "lucide-react";
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
      <Card className="shadow-xl bg-zinc-900 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  Semester {semester.semester} Results
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  Subject-wise performance breakdown
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-sm px-4 py-1.5">
                SGPA: {semester.sgpa.toFixed(2)}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-sm px-4 py-1.5">
                {semester.percentage.toFixed(2)}%
              </Badge>
              <Badge className="bg-zinc-700 text-zinc-300 text-sm px-4 py-1.5">
                {semester.totalMarks} / {semester.maxMarks}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="text-center p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    Internal
                  </th>
                  <th className="text-center p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    External
                  </th>
                  <th className="text-center p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-center p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
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
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-white">
                            {subject.papername}
                          </p>
                          <p className="text-xs text-zinc-600">
                            {subject.papercode}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-zinc-400 font-medium">
                          {internal}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-zinc-400 font-medium">
                          {external}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-white font-bold">
                          {total}
                          {hasReappear && (
                            <span className="text-yellow-500">*</span>
                          )}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Badge
                          className={`${getGradeBgColor(grade)} font-semibold`}
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
