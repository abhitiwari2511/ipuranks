import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useCaptcha = () => {
  const [captchaImage, setCaptchaImage] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const fetchCaptcha = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/captcha/generate`, {
        responseType: "blob",
      });

      const newSessionId = response.headers["x-session-id"];
      if (newSessionId) {
        setSessionId(newSessionId);
      }

      setErrorMessage(null);

      // (blob) svg to url
      const imageUrl = URL.createObjectURL(response.data);
      setCaptchaImage(imageUrl);
    } catch (error) {
      console.error("Failed to fetch captcha:", error);
      const isNetworkError = axios.isAxiosError(error) && !error.response;
      const message = isNetworkError
        ? "Site is not responding. Please try again later."
        : "Failed to load captcha. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  useEffect(() => {
    return () => {
      if (captchaImage) {
        URL.revokeObjectURL(captchaImage);
      }
    };
  }, [captchaImage]);

  return {
    captchaImage,
    sessionId,
    loading,
    errorMessage,
    refreshCaptcha: fetchCaptcha,
  };
};

export default useCaptcha;
