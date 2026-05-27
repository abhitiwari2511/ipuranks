import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Result from "./pages/ResultPage";
import { Analytics } from "@vercel/analytics/react";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = localStorage.getItem("ipuranks_logged_in") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="bg-[#f8f9fc] min-h-screen w-full">
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/result"
          element={
            <RequireAuth>
              <Result />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
