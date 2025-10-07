import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/authAPI";

export const useAuth = (requireAuth = false) => {
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const user = data?.user || null;
  const isAuthenticated = !!user;

  useEffect(() => {
    // Handle authentication errors
    if (error && !isLoading) {
      const errorMessage = error?.data?.message;

      // Only show error and redirect if auth is required
      if (requireAuth) {
        // Don't show toast for expected auth failures
        if (errorMessage && !errorMessage.includes("Unauthorized")) {
          toast.error(errorMessage);
        }
        navigate("/login", { replace: true });
      }
    }
  }, [error, isLoading, requireAuth, navigate]);

  useEffect(() => {
    // Redirect to login if auth is required but user is not authenticated
    if (requireAuth && !isLoading && !isAuthenticated && !error) {
      navigate("/login", { replace: true });
    }
  }, [requireAuth, isLoading, isAuthenticated, error, navigate]);

  return {
    isAuthenticated,
    isLoading,
    user,
    refetch,
  };
};
