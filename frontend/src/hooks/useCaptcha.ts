import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const useCaptcha = () => {
  const [captchaImage, setCaptchaImage] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

      if (captchaImage) {
        URL.revokeObjectURL(captchaImage);
      }

      // (blob) svg to url
      const imageUrl = URL.createObjectURL(response.data);
      setCaptchaImage(imageUrl);
    } catch (error) {
      console.error("Failed to fetch captcha:", error);
      toast.error("Failed to load captcha. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [baseURL, captchaImage]);

  useEffect(() => {
    fetchCaptcha();

    return () => {
      if (captchaImage) {
        URL.revokeObjectURL(captchaImage);
      }
    };
  }, []);

  return {
    captchaImage,
    sessionId,
    loading,
    refreshCaptcha: fetchCaptcha,
  };
};

export default useCaptcha;
