import { useNavigate } from "react-router-dom";
function PrivateRoute({ children }) {
 let Navigate =useNavigate();
  const isAuth = localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;