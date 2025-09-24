import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading || isAuthenticated === null) return <Loader />;

  return !isAuthenticated ? children : null;
};

export default GuestRoute;
