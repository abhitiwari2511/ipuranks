import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const formSchema = z.object({
  rollNo: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(32, "Username must be at most 32 characters."),
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
      toast.success("Login successful!", {
        description: "Redirecting to dashboard...",
      });
      // Handle successful login (e.g., redirect, store token, etc.)
    } else {
      // Refresh captcha on failed login
      await refreshCaptcha();
      form.reset({
        rollNo: data.rollNo,
        password: data.password,
        captcha: "",
      });
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>IPU RANKS</CardTitle>
        <CardDescription>
          Enter your credentials to view your results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="rollNo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-rollNo">
                    Enrollment Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-rollNo"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your enrollment number"
                    autoComplete="username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="captcha"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-captcha">
                    Captcha Verification
                  </FieldLabel>
                  <div className="flex gap-2 items-center">
                    <Input
                      {...field}
                      id="login-captcha"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter captcha"
                      autoComplete="off"
                      className="flex-1"
                    />
                    <div className="w-32 h-12 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm border">
                      {captchaLoading ? (
                        "Loading..."
                      ) : captchaImage ? (
                        <img
                          src={captchaImage}
                          alt="Captcha"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "Captcha Image"
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={refreshCaptcha}
                      disabled={captchaLoading}
                      className="h-12 w-12 shrink-0"
                      title="Refresh captcha"
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${captchaLoading ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="login-form"
          className="w-full"
          disabled={loginLoading || captchaLoading}
        >
          {loginLoading ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
