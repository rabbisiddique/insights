import { useState } from "react";
import toast from "react-hot-toast";

export const useGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSubmit = async () => {
    try {
      setIsLoading(true);
      // slight delay so loader shows
      const baseUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5000"
          : "https://insights-k5t9.onrender.com";

      // slight delay so loader shows
      setTimeout(() => {
        window.location.href = `${baseUrl}/api/auth/google`;
      }, 100);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return { handleGoogleSubmit, isLoading };
};
