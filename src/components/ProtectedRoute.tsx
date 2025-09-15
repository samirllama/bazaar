import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const ProtectedRoute = () => {
  const { userId } = useAuth();

  // If no user, redirect to the login page
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
