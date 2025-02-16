import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./admin.routes";
import ProtectedRoute from "../layouts/ProtectedRoute";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import RoleBasedRedirect from "../layouts/RoleBasedRedirect";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App as the root element
    children: [
      {
        index: true,
        element: <RoleBasedRedirect />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: adminRoutes, // This includes the index route
  },
]);

export default router;
