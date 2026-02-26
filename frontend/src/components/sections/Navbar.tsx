import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div>
      <div className="relative z-10 w-full px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            IPU Ranks
          </span>
        </div>
        <div className="flex items-center">
          <Link to="/login">
            <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white rounded-full px-6 shadow-lg shadow-emerald-500/20 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
