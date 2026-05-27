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
import ChartBarIcon from "@/components/ui/chart-bar-icon";
import BookIcon from "@/components/ui/book-icon";
import HistoryCircleIcon from "@/components/ui/history-circle-icon";

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
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="border-b border-slate-800/70">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-indigo-500/15 rounded-lg">
                <ChartBarIcon size={16} className="text-indigo-200" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-slate-100 tracking-tight font-display">
                  Cumulative Data Breakdown
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Comprehensive academic timeline summation
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setViewMode("semester")}
                className={`transition-all duration-200 rounded-md ${
                  viewMode === "semester"
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-md shadow-indigo-500/30"
                    : "bg-black/10 text-slate-300 border-white/10 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <BookIcon size={16} className="mr-1" />
                Semester
              </Button>
              <Button
                size="sm"
                onClick={() => setViewMode("year")}
                className={`transition-all duration-200 rounded-md ${
                  viewMode === "year"
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-md shadow-indigo-500/30"
                    : "bg-black/10 text-slate-300 border-white/10 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <HistoryCircleIcon size={16} className="mr-1" />
                Year
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/70">
                  <th className="text-left p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    {viewMode === "semester" ? "Semester" : "Year"}
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="text-left p-4 font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
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
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`border-b border-slate-800/60 transition-colors ${
                        isLast ? "bg-indigo-500/10" : "hover:bg-slate-900/60"
                      }`}
                    >
                      <td className="p-4">
                        <span
                          className={`font-medium text-sm ${
                            isLast
                              ? "text-indigo-300 font-semibold"
                              : "text-slate-200"
                          }`}
                        >
                          {row.semester}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-slate-300 font-mono-nums text-sm">
                          {row.marks}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-200 font-medium font-mono-nums text-sm">
                          {row.percentage} %
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-bold font-mono-nums text-sm ${
                            isLast ? "text-emerald-300" : "text-violet-300"
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
