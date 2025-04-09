import RecentOrders from "./DashboardContainers/RecentOrders/RecentOrders";
import RecentProducts from "./DashboardContainers/RecentProducts/RecentProducts";
import Order from "./Order/Order";
import Product from "./Product/Product";
import Users from "./User/Users";

const AdminHome = () => {
  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50 rounded-lg">
      <div className="mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800 ">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-center text-gray-600 pt-2">
            Here you can manage products, orders, and users.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Product />
          </div>
          <div className="flex-1">
            <Order />
          </div>
          <div className="flex-1">
            <Users />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mt-10 mb-6">
            Recent Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <RecentOrders />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <RecentProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
