import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import BookIcon from "@/components/ui/book-icon";
import RightChevron from "@/components/ui/right-chevron";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-transparent">
      <div className="relative w-full px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group transition-opacity hover:opacity-80"
        >
          <BookIcon size={20} className="text-indigo-200" />
          <span className="text-xl font-semibold text-slate-100 tracking-tight font-display">
            IPU Ranks
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button className="bg-indigo-500 cursor-pointer hover:bg-indigo-400 text-white rounded-full px-4 py-2 font-semibold shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2">
              Results Portal
              <RightChevron size={16} className="w-4 text-white" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
