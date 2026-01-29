import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CumulativeData } from "@/types/types";
import { TrendingUp, Calendar, BookOpen } from "lucide-react";

interface CumulativeResultsTableProps {
  semesterData: CumulativeData[];
  yearData: CumulativeData[];
}

const CumulativeResultsTable = ({
  semesterData,
  yearData,
}: CumulativeResultsTableProps) => {
  const [viewMode, setViewMode] = useState<"semester" | "year">("semester");
  const data = viewMode === "semester" ? semesterData : yearData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="shadow-xl bg-zinc-900 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white uppercase tracking-wide">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Cumulative Result Breakdown
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Progressive academic performance
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setViewMode("semester")}
                className={`transition-all duration-200 ${
                  viewMode === "semester"
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Semester
              </Button>
              <Button
                size="sm"
                onClick={() => setViewMode("year")}
                className={`transition-all duration-200 ${
                  viewMode === "year"
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Year
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    {viewMode === "semester" ? "Semester" : "Year"}
                  </th>
                  <th className="text-left p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="text-left p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="text-left p-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">
                    CGPA
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  const isLast = index === data.length - 1;
                  return (
                    <motion.tr
                      key={`${viewMode}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-zinc-800/50 transition-colors ${
                        isLast ? "" : "hover:bg-zinc-800/30"
                      }`}
                    >
                      <td className="p-4">
                        <span
                          className={`font-medium ${
                            isLast ? "text-emerald-400" : "text-zinc-300"
                          }`}
                        >
                          {row.semester}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-zinc-400">
                          {row.marks}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-zinc-300 font-medium">
                          {row.percentage} %
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-bold ${
                            isLast ? "text-lime-400" : "text-lime-400"
                          }`}
                        >
                          {row.gpa}
                        </span>
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

export default CumulativeResultsTable;
