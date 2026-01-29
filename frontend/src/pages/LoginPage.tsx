import LoginForm from "@/components/LoginForm";
import { GraduationCap, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 p-6 rounded-lg shadow-lg">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 group hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg">
                <GraduationCap className="w-5 h-5 text-zinc-100" />
              </div>
              <span className="font-bold text-lg text-zinc-100">IPU Ranks</span>
            </Link>

            <div className="bg-orange-950/20 border border-orange-500/20 rounded-lg p-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <h4 className="font-semibold text-white text-xl">
                    Password Information
                  </h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-sm text-zinc-300 marker:text-orange-500/50">
                    <li>
                      Default password is your{" "}
                      <span className="text-orange-400 font-medium">
                        father's full name in CAPITAL LETTERS
                      </span>
                    </li>
                    <li>Ensure space between words as per registered name</li>
                    <li>3 Wrong attempts will lead to temporary lockout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
