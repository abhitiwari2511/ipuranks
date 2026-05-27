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
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-slate-100 text-base">
            <LayoutDashboardIcon size={16} className="text-indigo-300" />
            Select Semester
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedView === "overall" ? "default" : "outline"}
              onClick={() => onViewChange("overall")}
              className={`transition-all duration-200 rounded-md ${
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
                className={`transition-all duration-200 rounded-md ${
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
