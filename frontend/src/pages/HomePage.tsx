import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          IPU Ranks
        </h1>
        <p className="text-zinc-400 text-lg max-w-md">
          View your IPU results with detailed analytics and performance insights
        </p>
        <Link to="/login">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 text-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
