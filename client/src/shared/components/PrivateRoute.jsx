import { Outlet } from "react-router-dom";
import { selectUser } from "../../redux/user/userSlice";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector(selectUser);
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
