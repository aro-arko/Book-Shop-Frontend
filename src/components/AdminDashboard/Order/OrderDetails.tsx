/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../redux/features/order/orderApi";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import UserDetails from "../User/UserDetails";
import OrderProducts from "./OrderProducts";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetOrderByIdQuery(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    console.error("Error fetching order details:", error);
    return (
      <p className="text-red-500 text-center py-10">
        Error loading order details
      </p>
    );
  }

  const order = data?.data;
  if (!order)
    return <p className="text-center py-10">No order details available</p>;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:mb-0">
            Order Details
          </h1>
          <p className="text-gray-600 pt-2">
            View and manage your order details from here.
          </p>
        </div>
        {/* User Information */}
        <UserDetails userId={order.user} />
        {/* Order Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Order ID</p>
              <p className="text-base font-semibold text-gray-800 break-all">
                {order._id}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="text-base font-semibold text-gray-800">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p
                className={`text-base font-semibold ${
                  order.status === "Paid" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {order.status}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Total Price</p>
              <p className="text-base font-semibold text-gray-800">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Products ({order.products.length})
          </h2>

          <div className="space-y-4">
            {order.products.map((product: any) => (
              <OrderProducts
                key={product._id}
                productId={product.product}
                quantity={product.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
