import AdminHome from "../components/AdminDashboard/AdminHome";
import AdminProfile from "../components/AdminDashboard/AdminProfile";
import ChangePassword from "../components/AdminDashboard/ChangePassword";
import EditProfile from "../components/AdminDashboard/EditProfile";
import AllProducts from "../components/AdminDashboard/Product/AllProducts";
import ProductDetails from "../components/AdminDashboard/Product/ProductDetails";
import UpdateProduct from "../components/AdminDashboard/Product/UpdateProduct";

export const adminRoutes = [
  {
    index: true,
    element: <AdminHome />,
  },
  {
    path: "profile",
    element: <AdminProfile />,
  },
  {
    path: "profile/edit",
    element: <EditProfile />,
  },
  {
    path: "change-password",
    element: <ChangePassword />,
  },
  {
    path: "products",
    element: <AllProducts />,
  },
  {
    path: "products/:productId",
    element: <ProductDetails />,
  },
  {
    path: "products/update/:productId",
    element: <UpdateProduct />,
  },
];
