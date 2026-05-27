import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
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

/* ── Shared tooltip styling ─────────────────────── */
const tooltipStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid #1f2937",
  borderRadius: "12px",
  boxShadow: "0 12px 40px -18px rgba(0, 0, 0, 0.65)",
  padding: "12px 16px",
};
const tooltipLabelStyle = { color: "#94a3b8", fontWeight: 600 };
const tooltipItemStyle = { color: "#e2e8f0" };

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
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-5"
    >
      {/* ── Percentage Trend ─────────────────────────────── */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-100 tracking-tight font-display">
            Academic Performance
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Your percentage progression trajectory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div tabIndex={-1} className="outline-none">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={lineChartData}>
                <defs>
                  <linearGradient
                    id="colorPercentage"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1f2937"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "16px" }}
                  formatter={(value) => (
                    <span style={{ color: "#94a3b8", fontSize: 13 }}>
                      {value}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="Percentage"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorPercentage)"
                  dot={{
                    fill: "#6366f1",
                    r: 4,
                    strokeWidth: 2,
                    stroke: "#0f172a",
                  }}
                  activeDot={{
                    r: 6,
                    stroke: "#6366f1",
                    strokeWidth: 2,
                    fill: "#0f172a",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── SGPA Trend ───────────────────────────────────── */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-100 tracking-tight font-display">
            SGPA Tracker
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Semester Grade Point Average (out of 10)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div tabIndex={-1} className="outline-none">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={lineChartData}>
                <defs>
                  <linearGradient id="colorSgpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1f2937"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 10]}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "16px" }}
                  formatter={(value) => (
                    <span style={{ color: "#94a3b8", fontSize: 13 }}>
                      {value}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="SGPA"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorSgpa)"
                  dot={{
                    fill: "#8b5cf6",
                    r: 4,
                    strokeWidth: 2,
                    stroke: "#0f172a",
                  }}
                  activeDot={{
                    r: 6,
                    stroke: "#8b5cf6",
                    strokeWidth: 2,
                    fill: "#0f172a",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── Radar Chart ──────────────────────────────────── */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-100 tracking-tight font-display">
            Performance Constellation
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Semester-wise proficiency analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div tabIndex={-1} className="outline-none">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarChartData}>
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis
                  dataKey="semester"
                  stroke="#94a3b8"
                  fontSize={12}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 10]}
                  stroke="#475569"
                  fontSize={10}
                />
                <Radar
                  name="SGPA"
                  dataKey="performance"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── Bar Chart (semester subjects / overall SGPA) ── */}
      <Card className="hover:shadow-lg transition-shadow duration-300 lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-100 tracking-tight font-display">
            {selectedSemester
              ? "Subject Insight Statistics"
              : "Semester Comparison"}
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            {selectedSemester
              ? "Deep dive into your marks distribution"
              : "Bird's-eye view of your SGPA consistency"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div tabIndex={-1} className="outline-none">
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
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="externalGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1f2937"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    angle={-35}
                    textAnchor="end"
                    height={50}
                    interval={0}
                    tick={{ fill: "#94a3b8" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(99, 102, 241, 0.12)" }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={() => null}
                    labelFormatter={(label, payload) => {
                      const item = payload?.[0]?.payload;
                      return item ? (
                        <div className="space-y-1">
                          <div className="text-xs text-slate-400 font-mono-nums">
                            {label}
                          </div>
                          <div className="font-semibold text-slate-100 text-sm">
                            {item.fullName}
                          </div>
                          <div className="text-indigo-300 font-bold">
                            Total: {item.Total}/100
                          </div>
                          <div className="flex gap-4 text-sm pt-1">
                            <span className="text-indigo-200">
                              Internal: {item.Internal}
                            </span>
                            <span className="text-violet-200">
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
                      <span style={{ color: "#94a3b8", fontSize: 13 }}>
                        {value}
                      </span>
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
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              ) : (
                <BarChart data={lineChartData} barCategoryGap="20%">
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#818cf8"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1f2937"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 10]}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(99, 102, 241, 0.12)" }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={(value) => [
                      `SGPA : ${Number(value).toFixed(2)}`,
                      "",
                    ]}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    formatter={(value) => (
                      <span style={{ color: "#94a3b8", fontSize: 13 }}>
                        {value}
                      </span>
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceCharts;
