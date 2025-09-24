import { useState } from "react";
import toast from "react-hot-toast";

export const useGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSubmit = async () => {
    try {
      setIsLoading(true);
      // slight delay so loader shows
      setTimeout(() => {
        window.location.href = "http://localhost:5000/api/auth/google";
      }, 100);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return { handleGoogleSubmit, isLoading };
};
