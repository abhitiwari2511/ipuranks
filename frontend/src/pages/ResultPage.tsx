import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import type { SubjectResult } from "@/types/types";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultData: SubjectResult[] = location.state?.resultData;
  const [selectedView, setSelectedView] = useState<"overall" | number>(
    "overall",
  );

  useEffect(() => {
    if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
      navigate("/", { replace: true });
    }
  }, [resultData, navigate]);

  if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
    return null;
  }

  // Process data first then get any other data
  const semesters = processResultData(resultData);
  const semesterCumulativeData = calculateSemesterCumulativeData(semesters);
  const yearCumulativeData = calculateYearCumulativeData(semesters);
  const { lineChart, radarChart } = generateChartData(semesters);

  // Student info jo mila array me
  const studentInfo = resultData[0];
  const overallCGPA =
    semesterCumulativeData[semesterCumulativeData.length - 1]?.gpa || "0.00";

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        <StudentInfoHeader
          studentName={studentInfo.stname}
          rollNo={studentInfo.nrollno}
          yearOfAdmission={studentInfo.yoa.toString()}
          instituteName={studentInfo.iname}
          overallCGPA={overallCGPA}
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
