import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Result from "./pages/Result";

const App = () => {
  return (
    <div className="bg-zinc-950 min-h-screen w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
