import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useCaptcha from "@/hooks/useCaptcha";
import useLogin from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import EyeIcon from "@/components/ui/eye-icon";
import EyeOffIcon from "@/components/ui/eye-off-icon";
import RefreshIcon from "@/components/ui/refresh-icon";

const formSchema = z.object({
  rollNo: z
    .string()
    .min(3, "roll no must be at least 3 characters.")
    .max(32, "roll no must be at most 32 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(64, "Password must be at most 64 characters."),
  captcha: z
    .string()
    .min(1, "Please enter the captcha.")
    .max(10, "Captcha must be at most 10 characters."),
});

const LoginForm = () => {
  const {
    captchaImage,
    sessionId,
    loading: captchaLoading,
    errorMessage: captchaErrorMessage,
    refreshCaptcha,
  } = useCaptcha();
  const { login, loading: loginLoading } = useLogin(sessionId);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rollNo: "",
      password: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setFormMessage(null);

    const result = await login(data);

    if (result.success && result.response.data.success) {
      setFormMessage(null);
      toast.success("Welcome back!", {
        description: "Analyzing your academic performance...",
        duration: 3000,
      });
      localStorage.setItem("ipuranks_logged_in", "true");
      localStorage.setItem(
        "ipuranks_result_data",
        JSON.stringify(result.response.data.result),
      );
      localStorage.setItem("ipuranks_session_id", sessionId ?? "");
      navigate("/result", {
        state: {
          resultData: result.response.data.result,
        },
      });
      return;
    }

    if (result.success && !result.response.data.success) {
      setFormMessage("Wrong password. Please enter the correct password.");
    } else if (!result.success && result.errorType === "wrong-password") {
      setFormMessage("Wrong password. Please enter the correct password.");
    } else if (!result.success && result.errorType === "captcha-expired") {
      setFormMessage("Captcha expired. Please refresh and try again.");
    }

    // Refresh captcha on failed login
    await refreshCaptcha();
    form.setValue("captcha", "");
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1 text-center py-4">
        <CardTitle className="text-3xl font-bold text-slate-100 font-display">
          Student Login
        </CardTitle>
        <CardDescription className="text-slate-400 text-sm">
          Access your comprehensive result dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <FieldGroup>
            <Controller
              name="rollNo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Enrollment Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-rollNo"
                    autoComplete="username"
                    placeholder="Enter enrollment number"
                    onChange={(event) => {
                      field.onChange(event);
                      setFormMessage(null);
                    }}
                    className="bg-slate-900/60 border-slate-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 h-10 text-sm transition-all font-mono-nums rounded-xl text-slate-100 placeholder:text-slate-500"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-[10px]"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Password
                  </FieldLabel>
                  <div className="relative flex w-full">
                    <Input
                      {...field}
                      id="login-password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(event) => {
                        field.onChange(event);
                        setFormMessage(null);
                      }}
                      className="bg-slate-900/60 border-slate-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 h-10 text-sm transition-all pr-10 rounded-xl text-slate-100 placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute cursor-pointer right-0 top-0 h-10 w-10 flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon size={16} />
                      ) : (
                        <EyeIcon size={16} />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-[10px]"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="captcha"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1">
                  <FieldLabel className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Security Check
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      id="login-captcha"
                      placeholder="Enter Captcha"
                      className="bg-slate-900/60 border-slate-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 h-10 text-sm transition-all flex-1 font-mono-nums tracking-widest text-center rounded-xl text-slate-100 placeholder:text-slate-500"
                    />
                    <div className="relative group shrink-0">
                      {captchaLoading ? (
                        <div className="h-10 w-32 rounded-xl bg-slate-800/60 animate-pulse" />
                      ) : (
                        <div className="relative flex h-10 w-32 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 p-1">
                          <img
                            src={captchaImage || undefined}
                            alt="Captcha"
                            className="h-full w-full object-contain opacity-90"
                          />
                        </div>
                      )}
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute cursor-pointer -right-2 -top-2 h-7 w-7 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-indigo-300 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={refreshCaptcha}
                        disabled={captchaLoading}
                      >
                        <RefreshIcon
                          size={12}
                          className={captchaLoading ? "animate-spin" : ""}
                        />
                      </Button>
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-[10px]"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 mt-5 text-white font-bold text-sm h-10 transition-all active:scale-[0.98] rounded-xl shadow-md shadow-indigo-500/30"
            disabled={loginLoading}
          >
            {loginLoading ? (
              <span className="flex items-center gap-2">
                <RefreshIcon size={12} className="animate-spin" /> Verifying...
              </span>
            ) : (
              "Access Dashboard"
            )}
          </Button>
          {(formMessage || captchaErrorMessage) && (
            <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm font-medium text-red-200">
              {formMessage ?? captchaErrorMessage}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
