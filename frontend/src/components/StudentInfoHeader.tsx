import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Calendar,
  Building2,
  Award,
  BookOpen,
  LogOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface StudentInfoHeaderProps {
  studentName: string;
  rollNo: string;
  yearOfAdmission: string;
  instituteName: string;
  overallCGPA: string;
}

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

const InfoCard = ({ icon, label, value, highlight }: InfoCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-4 rounded-xl ${
      highlight
        ? "bg-linear-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30"
        : "bg-zinc-800/50 border border-zinc-700"
    } backdrop-blur-sm transition-all`}
  >
    <div className="flex items-center gap-3">
      <div className={highlight ? "text-emerald-400" : "text-zinc-400"}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-wider">
          {label}
        </p>
        <p
          className={`font-bold text-lg ${
            highlight
              ? "bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const StudentInfoHeader = ({
  studentName,
  rollNo,
  yearOfAdmission,
  instituteName,
  overallCGPA,
}: StudentInfoHeaderProps) => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/user/logout`);
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/", { replace: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-linear-to-r from-zinc-800 via-zinc-900 to-zinc-800 text-white border-zinc-700 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {studentName}
              </CardTitle>
              <CardDescription className="text-zinc-400 text-lg">
                Academic Performance Dashboard
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <GraduationCap className="w-16 h-16 text-emerald-400" />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-zinc-800/50 border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard
              icon={<BookOpen className="w-5 h-5" />}
              label="Roll Number"
              value={rollNo}
            />
            <InfoCard
              icon={<Calendar className="w-5 h-5" />}
              label="Year of Admission"
              value={yearOfAdmission}
            />
            <InfoCard
              icon={<Building2 className="w-5 h-5" />}
              label="Institute"
              value={instituteName}
            />
            <InfoCard
              icon={<Award className="w-5 h-5" />}
              label="Overall CGPA"
              value={overallCGPA}
              highlight
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentInfoHeader;
