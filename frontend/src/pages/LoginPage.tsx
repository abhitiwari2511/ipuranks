import LoginForm from "@/components/LoginForm";
import BookIcon from "@/components/ui/book-icon";
import TriangleAlertIcon from "@/components/ui/triangle-alert-icon";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Decorative blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 p-7 border border-slate-800/70 rounded-2xl bg-slate-950/70 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group hover:opacity-80 transition-opacity"
            >
              <div className="p-2.5 bg-indigo-500/15 border border-indigo-500/30 rounded-xl shadow-sm group-hover:border-indigo-400 transition-colors">
                <BookIcon size={24} className="text-indigo-200" />
              </div>
              <span className="font-bold text-2xl text-slate-100 tracking-tight font-display">
                IPU Ranks
              </span>
            </Link>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <TriangleAlertIcon
                  size={20}
                  className="text-amber-300 shrink-0 mt-0.5"
                />
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-100 text-base">
                    Password Information
                  </h4>
                  <ul className="list-none space-y-2 text-sm text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-amber-300">•</span>
                      <span>
                        Default password is your{" "}
                        <strong className="text-amber-200 font-semibold">
                          father's full name in CAPITAL LETTERS
                        </strong>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-300">•</span>
                      <span>
                        Ensure space between words as per registered name
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-300">•</span>
                      <span>
                        3 Wrong attempts will lead to temporary lockout
                      </span>
                    </li>
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
