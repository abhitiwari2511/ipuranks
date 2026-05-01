import { useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import type { SubjectResult } from "@/types/types";

interface LoginData {
  rollNo: string;
  password: string;
  captcha: string;
}

interface LoginResponse {
  success: boolean;
  result: SubjectResult[];
}

type LoginErrorType =
  | "captcha-expired"
  | "wrong-password"
  | "server"
  | "network"
  | "unknown";

type LoginResult =
  | { success: true; response: AxiosResponse<LoginResponse> }
  | { success: false; errorType: LoginErrorType };

const useLogin = (sessionId: string) => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const login = async (loginData: LoginData): Promise<LoginResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        `${baseURL}/user/login`,
        {
          rollNo: loginData.rollNo,
          password: loginData.password,
          captcha: loginData.captcha,
        },
        {
          headers: {
            "x-session-id": sessionId,
            "Content-Type": "application/json",
          },
        },
      );

      if (!sessionId) {
        return { success: false, errorType: "captcha-expired" };
      }
      setData(response.data);
      console.log("finalData:", response.data.result);
      return { success: true, response };
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred");
      setError(error);
      let message = "Login failed. Please try again.";
      let errorType: LoginErrorType = "unknown";
      const axiosError = axios.isAxiosError(err) ? err : null;
      const serverData = axiosError?.response?.data as
        | { message?: string; error?: string }
        | undefined;
      const serverMessage = serverData?.message ?? serverData?.error;

      if (!axiosError?.response) {
        message = "Site is not responding. Please try again later.";
        errorType = "network";
      } else if (axiosError.response.status === 401) {
        message = "Wrong password. Please enter the correct password.";
        errorType = "wrong-password";
      } else if (serverMessage?.toLowerCase().includes("captcha")) {
        errorType = "captcha-expired";
      } else if (serverMessage) {
        message = serverMessage;
        errorType = "unknown";
      } else if (axiosError.response.status >= 500) {
        message = "Server error. Please try again later.";
        errorType = "server";
      }

      if (errorType !== "wrong-password" && errorType !== "captcha-expired") {
        toast.error(message);
      }
      return { success: false, errorType };
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    login,
  };
};

export default useLogin;
