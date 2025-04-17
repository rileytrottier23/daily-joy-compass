
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Add debugging to help trace the issue
  useEffect(() => {
    console.log("Index component rendered");
    console.log("Authentication state:", { isAuthenticated, isLoading });
    console.log("Current location:", location);
  }, [isAuthenticated, isLoading, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to /home if authenticated or /auth if not
  return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth" />;
};

export default Index;
