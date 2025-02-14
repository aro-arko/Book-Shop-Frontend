import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (currentUser?.user?.role !== "admin") {
        await dispatch(logOut());
        setRedirect(true);
      }
      setIsLoading(false);
    };

    checkUserRole();
  }, [currentUser, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (redirect) return <Navigate to="/" />;

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
