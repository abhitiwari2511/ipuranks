import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface LoginData {
  rollNo: string;
  password: string;
  captcha: string;
}

interface LoginResponse {
  success: boolean;
  result: boolean;
}

const useLogin = (sessionId: string) => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const login = async (loginData: LoginData) => {
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
        toast.error("Captcha expired. Please refresh captcha.");
        return null;
      }
      setData(response.data);
      return response;
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred");
      setError(error);
      toast.error(
        (axios.isAxiosError(err) && err.response?.data?.message) ||
          (axios.isAxiosError(err) && err.response?.data?.error) ||
          "Login failed. Please try again.",
      );
      return null;
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
