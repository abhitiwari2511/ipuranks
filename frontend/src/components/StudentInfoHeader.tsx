import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import BookIcon from "@/components/ui/book-icon";
import HistoryCircleIcon from "@/components/ui/history-circle-icon";
import MapPinIcon from "@/components/ui/map-pin-icon";
import TrophyIcon from "@/components/ui/trophy-icon";
import LogoutIcon from "@/components/ui/logout-icon";

interface StudentInfoHeaderProps {
  studentName: string;
  rollNo: string;
  yearOfAdmission: string;
  instituteName: string;
  overallCGPA: string;
  overallCredits: string;
}

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

const InfoCard = ({ icon, label, value, highlight }: InfoCardProps) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className={`p-4 rounded-md transition-all ${
      highlight
        ? "bg-gradient-to-br from-indigo-500/15 to-violet-500/10 border border-indigo-400/30 shadow-sm shadow-black/30"
        : "bg-slate-950/60 border border-slate-800/70"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-lg ${
          highlight
            ? "bg-indigo-500/20 text-indigo-200"
            : "bg-slate-900 text-slate-400 border border-slate-800/70"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
          {label}
        </p>
        <p
          className={`font-bold text-lg truncate ${
            highlight ? "text-indigo-200" : "text-slate-100"
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
  overallCredits,
}: StudentInfoHeaderProps) => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const clearLocalStorage = () => {
    localStorage.removeItem("ipuranks_logged_in");
    localStorage.removeItem("ipuranks_result_data");
    localStorage.removeItem("ipuranks_session_id");
  };

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("ipuranks_session_id") ?? "";
    let didLogout = false;

    try {
      await axios.post(
        `${baseURL}/user/logout`,
        // {},
        {
          headers: {
            "x-session-id": sessionId,
            "Content-Type": "application/json",
          },
        },
      );
      didLogout = true;
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearLocalStorage();
      if (didLogout) {
        toast.success("Logged out successfully");
      } else {
        toast.error("Logout failed. Cleared local session.");
      }
      navigate("/", { replace: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/15 border border-indigo-500/30 rounded-2xl">
                <BookIcon size={28} className="text-indigo-200" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 font-display">
                  {studentName}
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  Academic Performance Dashboard
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/40 transition-colors rounded-md self-start sm:self-auto"
            >
              <LogoutIcon size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <InfoCard
              icon={<BookIcon size={16} />}
              label="Roll Number"
              value={rollNo}
            />
            <InfoCard
              icon={<HistoryCircleIcon size={16} />}
              label="Year of Admission"
              value={yearOfAdmission}
            />
            <InfoCard
              icon={<MapPinIcon size={16} />}
              label="Institute"
              value={instituteName}
            />
            <InfoCard
              icon={<TrophyIcon size={16} />}
              label="Overall CGPA"
              value={overallCGPA}
              highlight
            />
            <InfoCard
              icon={<HistoryCircleIcon size={16} />}
              label="Total Credits"
              value={overallCredits}
              highlight
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentInfoHeader;
