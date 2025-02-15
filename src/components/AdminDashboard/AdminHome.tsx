import Order from "./Order/Order";
import Product from "./Product/Product";

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Product />
          </div>
          <div className="flex-1">
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
