import { ShoppingBag } from "lucide-react";
import { useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";

const Order = () => {
  const { data: response, isLoading, error } = useGetAllOrdersQuery({});

  const totalOrders = response?.data?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col items-center">
      <div className="bg-green-100 p-3 rounded-full mb-4">
        <ShoppingBag className="h-6 w-6 text-green-600" />
      </div>

      <h3 className="text-lg font-medium text-gray-500 mb-1">Orders</h3>

      {isLoading ? (
        <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-green-500 animate-spin" />
      ) : error ? (
        <p className="text-red-500 text-sm">Error loading</p>
      ) : (
        <p className="text-2xl font-bold text-gray-800">
          {totalOrders.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default Order;
