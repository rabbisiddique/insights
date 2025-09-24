import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../features/auth/authAPI";

export const useAuth = (checkNow = false) => {
  const [skip, setSkip] = useState(!checkNow);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { data, error, isLoading, refetch } = useGetUserQuery(null, { skip });

  useEffect(() => {
    if (checkNow) setSkip(false);
  }, [checkNow]);

  useEffect(() => {
    if (data?.user) {
      setIsAuthenticated(true);
      console.log(data.user);
    } else if (error) {
      if (!skip) {
        toast.error(error?.data?.message || "Auth error");
      }
      setIsAuthenticated(false);
    }
  }, [data, error, skip]);

  return {
    isAuthenticated,
    isLoading,
    user: data?.user || null,
  };
};
