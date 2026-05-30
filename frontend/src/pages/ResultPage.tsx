import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  StudentInfoHeader,
  SemesterSelector,
  PerformanceCharts,
  SemesterDetails,
  CumulativeResultsTable,
  OverallGrades,
} from "@/utils/exports";
import {
  processResultData,
  calculateSemesterCumulativeData,
  calculateYearCumulativeData,
  generateChartData,
} from "@/utils/resultProcessing";
import { calculateProgressiveCGPA } from "@/utils/cgpaUtils";
import type { SubjectResult } from "@/types/types";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationResultData: SubjectResult[] | undefined =
    location.state?.resultData;
  const [selectedView, setSelectedView] = useState<"overall" | number>(
    "overall",
  );

  const resolvedResultData = useMemo(() => {
    if (Array.isArray(locationResultData) && locationResultData.length > 0) {
      return locationResultData;
    }

    const storedResult = localStorage.getItem("ipuranks_result_data");
    if (!storedResult) {
      return null;
    }

    try {
      const parsedResult = JSON.parse(storedResult);
      return Array.isArray(parsedResult) && parsedResult.length > 0
        ? (parsedResult as SubjectResult[])
        : null;
    } catch {
      return null;
    }
  }, [locationResultData]);

  useEffect(() => {
    if (!resolvedResultData) {
      navigate("/", { replace: true });
    }
  }, [resolvedResultData, navigate]);

  if (!resolvedResultData || resolvedResultData.length === 0) {
    return null;
  }

  // Process data first then get any other data
  const semesters = processResultData(resolvedResultData);
  const semesterCumulativeData = calculateSemesterCumulativeData(semesters);
  const yearCumulativeData = calculateYearCumulativeData(semesters);
  const { lineChart, radarChart } = generateChartData(semesters);
  const progressiveCGPA = calculateProgressiveCGPA(semesters);

  // Student info jo mila array me
  const studentInfo = resolvedResultData[0];
  const overallCGPA =
    semesterCumulativeData[semesterCumulativeData.length - 1]?.gpa || "0.00";
  const lastProg = progressiveCGPA[progressiveCGPA.length - 1];
  const overallCredits = lastProg
    ? `${lastProg.cumulativeCreditsEarned}/${lastProg.cumulativeCreditsPossible ?? 0}`
    : "0/0";

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Soft decorative gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto p-3 md:p-8 space-y-6 max-w-7xl">
        <StudentInfoHeader
          studentName={studentInfo.stname}
          rollNo={studentInfo.nrollno}
          yearOfAdmission={studentInfo.yoa.toString()}
          instituteName={studentInfo.iname}
          overallCGPA={overallCGPA}
          overallCredits={overallCredits}
        />

        <SemesterSelector
          semesters={semesters.map((s) => s.semester)}
          selectedView={selectedView}
          onViewChange={setSelectedView}
        />

        <AnimatePresence mode="wait">
          <PerformanceCharts
            key={selectedView}
            lineChartData={lineChart}
            radarChartData={radarChart}
            selectedSemester={
              selectedView !== "overall"
                ? semesters.find((s) => s.semester === selectedView) || null
                : null
            }
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {selectedView === "overall" && (
            <OverallGrades key="overall-grades" semesters={semesters} />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {selectedView !== "overall" && (
            <SemesterDetails
              key={`details-${selectedView}`}
              semester={semesters.find((s) => s.semester === selectedView)!}
            />
          )}
        </AnimatePresence>

        <CumulativeResultsTable
          semesterData={semesterCumulativeData}
          yearData={yearCumulativeData}
        />
      </div>
    </div>
  );
};

export default Result;
