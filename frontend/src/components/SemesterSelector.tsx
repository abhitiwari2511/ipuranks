import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LayoutDashboardIcon from "@/components/ui/layout-dashboard-icon";

interface SemesterSelectorProps {
  semesters: number[];
  selectedView: "overall" | number;
  onViewChange: (view: "overall" | number) => void;
}

const SemesterSelector = ({
  semesters,
  selectedView,
  onViewChange,
}: SemesterSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-100 text-base">
            <LayoutDashboardIcon size={16} className="text-indigo-300" />
            Select Semester
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap">
            <Button
              variant={selectedView === "overall" ? "default" : "outline"}
              onClick={() => onViewChange("overall")}
              className={`h-10 w-full px-2.5 py-1.5 text-xs sm:h-9 sm:w-auto sm:px-4 sm:py-2 sm:text-sm transition-all duration-200 rounded-md ${
                selectedView === "overall"
                  ? "bg-indigo-500 hover:bg-indigo-400 text-white border-0 shadow-md shadow-indigo-500/30"
                  : "bg-black/10 text-slate-300 border-white/10 hover:bg-white/5 hover:text-slate-100"
              }`}
            >
              Overall
            </Button>
            {semesters.map((sem) => (
              <Button
                key={sem}
                variant={selectedView === sem ? "default" : "outline"}
                onClick={() => onViewChange(sem)}
                className={`h-10 w-full px-2.5 py-1.5 text-xs sm:h-9 sm:w-auto sm:px-4 sm:py-2 sm:text-sm transition-all duration-200 rounded-md ${
                  selectedView === sem
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white border-0 shadow-md shadow-indigo-500/30"
                    : "bg-black/10 text-slate-300 border-white/10 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                Sem {sem}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SemesterSelector;
