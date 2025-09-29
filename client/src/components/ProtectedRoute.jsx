import { Navigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated, isLoading } = useAuth(true);

  if (isLoading || isAuthenticated === null)
    return (
      <div className="flex justify-center items-center">
        <ClipLoader size={30} color="#4f46e5" />
      </div>
    );

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
