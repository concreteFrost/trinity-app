import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({children }) => {
    const user = useSelector((state)=> state.userReducer)

    if (!user.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

export default ProtectedRoute;