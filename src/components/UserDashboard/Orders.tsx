/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet";
import { useOwnOrdersQuery } from "../../redux/features/order/orderApi";
import LoadingSpinner from "../Loading/LoadingSpinner";
import OrderedProductDetails from "./OrderedProductDetails";
import {
  FiPackage,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
  FiTruck,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <FiCheckCircle className="text-green-500" />;
    case "shipped":
      return <FiTruck className="text-blue-500" />;
    case "processing":
      return <FiClock className="text-yellow-500" />;
    case "cancelled":
      return <FiAlertCircle className="text-red-500" />;
    default:
      return <FiPackage className="text-gray-500" />;
  }
};

const Orders = () => {
  const { data, isLoading, error } = useOwnOrdersQuery(undefined);

  const ordersData = data?.data;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error loading orders</p>;

  return (
    <div className="max-w-7xl mx-auto px-4  lg:px-0 py-10">
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="This is user orders page" />
      </Helmet>
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">My Orders</h2>
      </div>

      {ordersData?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiPackage className="mx-auto text-5xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500">
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {ordersData?.map((order: any) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FiPackage className="mr-2 text-indigo-500" />
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center">
                    {getStatusIcon(order.status)}
                    <span
                      className={`ml-2 font-medium ${
                        order.status.toLowerCase() === "completed"
                          ? "text-green-600"
                          : order.status.toLowerCase() === "shipped"
                          ? "text-blue-600"
                          : order.status.toLowerCase() === "processing"
                          ? "text-yellow-600"
                          : order.status.toLowerCase() === "cancelled"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-semibold">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiCreditCard className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Payment</p>
                      <p className="font-semibold">
                        {order.transaction?.status || "Paid"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-semibold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Ordered Products
                  </h3>
                  <div className="space-y-4">
                    {order.products.map(
                      (item: any) =>
                        item &&
                        item.product && (
                          <OrderedProductDetails
                            key={item._id}
                            product={item.product}
                            quantity={item.quantity}
                          />
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
