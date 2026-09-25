import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const access = localStorage.getItem("access");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!access) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;