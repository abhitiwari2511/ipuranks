import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from "recharts";
import type { ChartData, RadarData, SemesterData } from "@/types/types";

interface PerformanceChartsProps {
  lineChartData: ChartData[];
  radarChartData: RadarData[];
  selectedSemester?: SemesterData | null;
}

const PerformanceCharts = ({
  lineChartData,
  radarChartData,
  selectedSemester,
}: PerformanceChartsProps) => {

  const semesterBarData = selectedSemester
    ? selectedSemester.subjects.map((subject) => ({
        name: subject.papercode,
        fullName: subject.papername,
        Internal: parseInt(subject.minorprint) || 0,
        External: parseInt(subject.majorprint) || 0,
        Total: parseFloat(subject.moderatedprint) || 0,
      }))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Percentage Trend Chart */}
      <Card className="shadow-xl hover:shadow-2xl transition-all bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-white">
            Percentage Trend
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Percentage across semesters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#52525b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#52525b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "12px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                labelStyle={{ color: "#a1a1aa", fontWeight: 600 }}
                itemStyle={{ color: "#e4e4e7" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span style={{ color: "#a1a1aa" }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="Percentage"
                stroke="#34d399"
                strokeWidth={3}
                dot={{ fill: "#34d399", r: 5, strokeWidth: 0 }}
                activeDot={{
                  r: 7,
                  stroke: "#34d399",
                  strokeWidth: 2,
                  fill: "#18181b",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* SGPA Trend Chart */}
      <Card className="shadow-xl hover:shadow-2xl transition-all bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-white">
            SGPA Trend
          </CardTitle>
          <CardDescription className="text-zinc-500">
            SGPA across semesters (out of 10)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#52525b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#52525b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "12px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                labelStyle={{ color: "#a1a1aa", fontWeight: 600 }}
                itemStyle={{ color: "#e4e4e7" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span style={{ color: "#a1a1aa" }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="SGPA"
                stroke="#818cf8"
                strokeWidth={3}
                dot={{ fill: "#818cf8", r: 5, strokeWidth: 0 }}
                activeDot={{
                  r: 7,
                  stroke: "#818cf8",
                  strokeWidth: 2,
                  fill: "#18181b",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card className="shadow-xl hover:shadow-2xl transition-all bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-white">
            Performance Overview
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Semester-wise performance radar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarChartData}>
              <PolarGrid stroke="#27272a" />
              <PolarAngleAxis
                dataKey="semester"
                stroke="#71717a"
                fontSize={12}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                stroke="#3f3f46"
                fontSize={10}
              />
              <Radar
                name="SGPA"
                dataKey="performance"
                stroke="#818cf8"
                fill="#818cf8"
                fillOpacity={0.35}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#a1a1aa" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="shadow-xl hover:shadow-2xl transition-all lg:col-span-2 bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-white uppercase tracking-wide">
            {selectedSemester ? "Semester Statistics" : "Semester Comparison"}
          </CardTitle>
          <CardDescription className="text-zinc-500">
            {selectedSemester
              ? "Subject-wise marks distribution"
              : "SGPA comparison across all semesters"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            {semesterBarData ? (
              <BarChart data={semesterBarData} barCategoryGap="15%">
                <defs>
                  <linearGradient
                    id="internalGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="externalGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a3e635" stopOpacity={1} />
                    <stop offset="100%" stopColor="#65a30d" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  angle={-35}
                  textAnchor="end"
                  height={50}
                  interval={0}
                  tick={{ fill: "#71717a" }}
                />
                <YAxis
                  stroke="#52525b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    padding: "12px 16px",
                  }}
                  labelStyle={{
                    color: "#a1a1aa",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                  formatter={() => null}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item ? (
                      <div className="space-y-1">
                        <div className="text-xs text-zinc-500 font-mono">
                          {label}
                        </div>
                        <div className="font-semibold text-white text-sm">
                          {item.fullName}
                        </div>
                        <div className="text-emerald-400 font-bold">
                          Total: {item.Total}/100
                        </div>
                        <div className="flex gap-4 text-sm pt-1">
                          <span className="text-cyan-400">
                            Internal: {item.Internal}
                          </span>
                          <span className="text-lime-400">
                            External: {item.External}
                          </span>
                        </div>
                      </div>
                    ) : (
                      label
                    );
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px" }}
                  formatter={(value) => (
                    <span style={{ color: "#a1a1aa" }}>{value}</span>
                  )}
                />
                <Bar
                  dataKey="Internal"
                  stackId="marks"
                  fill="url(#internalGradient)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="External"
                  stackId="marks"
                  fill="url(#externalGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <BarChart data={lineChartData} barCategoryGap="20%">
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#52525b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#52525b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 10]}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                    padding: "12px 16px",
                  }}
                  labelStyle={{ color: "#a1a1aa", fontWeight: 600 }}
                  formatter={(value) => [
                    `SGPA : ${Number(value).toFixed(2)}`,
                    "",
                  ]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px" }}
                  formatter={(value) => (
                    <span style={{ color: "#a1a1aa" }}>{value}</span>
                  )}
                />
                <Bar
                  dataKey="SGPA"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={80}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceCharts;
