import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./admin.routes";
import { userRoutes } from "./user.routes"; // Import userRoutes
import ProtectedRoute from "../layouts/ProtectedRoute";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Home from "../pages/Home";
import RoleBasedRedirect from "../layouts/RoleBasedRedirect";
import Books from "../components/PublicDashboard/Books";
import BookDetails from "../components/PublicDashboard/BookDetails";
import Navbar from "../pages/Navbar";
import Footer from "../components/PublicDashboard/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <RoleBasedRedirect />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "books/:productId",
        element: <BookDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
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
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Outlet />
        <Footer></Footer>
      </ProtectedRoute>
    ),
    children: userRoutes, // This includes the user routes
  },
]);

export default router;
