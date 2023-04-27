import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  localStorage.setItem("lastRoute", location.pathname)
  return children;
};

export default ProtectedRoute;
