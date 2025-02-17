import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import Navbar from "../pages/Navbar";
import Footer from "../components/PublicDashboard/Footer";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector((state) => state.auth.user);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {user?.role !== "admin" ? <Navbar /> : null}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
