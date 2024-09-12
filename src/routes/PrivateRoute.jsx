import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // Fetch user data from Redux store or any global state
console.log(user.user)
  // Check if user is authenticated
  if ( user.user === null) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow access to the route
  return children;
};

export default PrivateRoute;
