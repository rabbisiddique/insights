import { Loader } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated, isLoading } = useAuth(true);

  if (isLoading || isAuthenticated === null)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
