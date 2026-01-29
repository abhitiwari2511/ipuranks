import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Result from "./pages/ResultPage";
import { Analytics } from "@vercel/analytics/next"

const App = () => {
  return (
    <div className="bg-zinc-950 min-h-screen w-full">
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
