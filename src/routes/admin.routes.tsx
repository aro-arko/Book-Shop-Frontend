import AdminProfile from "../components/AdminDashboard/AdminProfile";
import EditProfile from "../components/AdminDashboard/EditProfile";

export const adminRoutes = [
  {
    path: "profile",
    element: <AdminProfile />,
  },
  {
    path: "profile/edit",
    element: <EditProfile />,
  },
];
