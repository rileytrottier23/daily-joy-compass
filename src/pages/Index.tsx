
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default Index;
