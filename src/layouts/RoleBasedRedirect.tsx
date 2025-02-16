import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const RoleBasedRedirect = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  if (currentUser?.role === "admin") {
    return <Navigate to="/admin" />;
  } else {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default RoleBasedRedirect;
