import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./admin.routes";
import ProtectedRoute from "../layouts/ProtectedRoute";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import RoleBasedRedirect from "../layouts/RoleBasedRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedRedirect />,
    children: [
      {
        index: true,
        element: <App />,
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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
