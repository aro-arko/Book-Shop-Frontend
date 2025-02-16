import Cart from "../components/UserDashboard/Cart";
import ChangePasswordUser from "../components/UserDashboard/ChangePasswordUser";
import EditUserProfile from "../components/UserDashboard/EditUserProfile";
import MakeOrder from "../components/UserDashboard/MakeOrder";
import Orders from "../components/UserDashboard/Orders";
import OrderVerification from "../components/UserDashboard/OrderVerification";
import UserProfile from "../components/UserDashboard/UserProfile";

export const userRoutes = [
  {
    path: "profile",
    element: <UserProfile />,
  },
  {
    path: "profile/edit",
    element: <EditUserProfile />,
  },
  {
    path: "change-password",
    element: <ChangePasswordUser />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "checkout",
    element: <MakeOrder />,
  },
  {
    path: "order/verification",
    element: <OrderVerification />,
  },
];
