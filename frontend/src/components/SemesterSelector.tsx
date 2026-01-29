import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";

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
      <Card className="shadow-xl bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <LayoutGrid className="w-5 h-5 text-emerald-400" />
            Select Semester
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedView === "overall" ? "default" : "outline"}
              onClick={() => onViewChange("overall")}
              className={`transition-all duration-200 ${
                selectedView === "overall"
                  ? "bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
                  : "border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
              }`}
            >
              Overall
            </Button>
            {semesters.map((sem) => (
              <Button
                key={sem}
                variant={selectedView === sem ? "default" : "outline"}
                onClick={() => onViewChange(sem)}
                className={`transition-all duration-200 ${
                  selectedView === sem
                    ? "bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
                    : "border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
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