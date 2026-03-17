import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
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
    refreshCaptcha,
  } = useCaptcha();
  const { login, loading: loginLoading } = useLogin(sessionId);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rollNo: "",
      password: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await login(data);

    if (response?.data.success) {
      toast.success("Welcome back!", {
        description: "Analyzing your academic performance...",
        duration: 3000,
      });
      navigate("/result", {
        state: {
          resultData: response.data.result,
        },
      });
    } else {
      // Refresh captcha on failed login
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      });
      await refreshCaptcha();
      form.setValue("captcha", "");
    }
  };

  return (
    <Card className="w-full bg-zinc-900 border-zinc-800 shadow-xl overflow-hidden">
      <CardHeader className="space-y-1 text-center py-3">
        <CardTitle className="text-4xl font-bold text-white">
          Student Login
        </CardTitle>
        <CardDescription className="text-zinc-500 text-sm">
          Access your comprehensive result dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
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
                <Field
                  data-invalid={fieldState.invalid}
                  className="space-y-0.5"
                >
                  <FieldLabel className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Enrollment Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-rollNo"
                    autoComplete="username"
                    placeholder="Enter enrollment number"
                    className="bg-zinc-950 border-zinc-800 focus:border-zinc-700 h-9 text-sm transition-all font-mono"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-400 text-[10px]"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="space-y-0.5"
                >
                  <FieldLabel className="text-[10px] -mt-2 font-medium uppercase tracking-wider text-zinc-500">
                    Password
                  </FieldLabel>
                  <div className="relative flex w-full">
                    <Input
                      {...field}
                      id="login-password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-zinc-950 border-zinc-800 focus:border-zinc-700 h-9 text-sm transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute cursor-pointer right-0 top-0 h-9 w-9 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-400 text-[10px]"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="captcha"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="space-y-0.5"
                >
                  <FieldLabel className="text-[10px] -mt-2 font-medium uppercase tracking-wider text-zinc-500">
                    Security Check
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      id="login-captcha"
                      placeholder="Enter Captcha"
                      className="bg-zinc-950 border-zinc-800 focus:border-zinc-700 h-9 text-sm transition-all flex-1 font-mono tracking-widest text-center"
                    />
                    <div className="relative group shrink-0">
                      {captchaLoading ? (
                        <div className="w-25 h-9 rounded-md bg-zinc-800 animate-pulse" />
                      ) : (
                        <div className="relative overflow-hidden rounded-md border border-zinc-800 bg-white">
                          <img
                            src={captchaImage || ""}
                            alt="Captcha"
                            className="h-9 w-28 -mr-1 ml-1 object-cover opacity-90"
                          />
                        </div>
                      )}
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute cursor-pointer -right-2 -top-2 h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={refreshCaptcha}
                        disabled={captchaLoading}
                      >
                        <RefreshCw
                          className={`h-2.5 w-2.5 ${captchaLoading ? "animate-spin" : ""}`}
                        />
                      </Button>
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-400 text-[10px]"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full bg-white hover:bg-zinc-200 mt-5 text-zinc-950 font-bold text-sm h-9 transition-all active:scale-[0.98]"
            disabled={loginLoading}
          >
            {loginLoading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-3 w-3 animate-spin" /> Verifying...
              </span>
            ) : (
              "Access Dashboard"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
