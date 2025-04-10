import { Link } from "react-router-dom";
import {
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  ArrowRight,
} from "react-feather";
import { useGetAllOrdersQuery } from "../../../../redux/features/order/orderApi";
import LoadingSpinner from "../../../Loading/LoadingSpinner";

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  subject?: string;
}

const RecentOrders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error loading orders</p>;

  const orders = data?.data || [];
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Orders
        </h2>
        <Link
          to="/admin/orders"
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent orders</p>
        ) : (
          recentOrders.map((order: Order) => (
            <div
              key={order._id}
              className="bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <Link to={`/admin/orders/${order._id}`} className="block p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Order ID */}
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <FileText className="text-indigo-500 mr-2 h-4 w-4" />
                      <span className="text-xs font-medium text-gray-500">
                        Order ID
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 ml-6 truncate">
                      {order._id}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <Calendar className="text-sky-500 mr-2 h-4 w-4" />
                      <span className="text-xs font-medium text-gray-500">
                        Date
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 ml-6">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <DollarSign className="text-emerald-500 mr-2 h-4 w-4" />
                      <span className="text-xs font-medium text-gray-500">
                        Amount
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 ml-6">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      {order.status === "Paid" ? (
                        <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      ) : (
                        <Clock className="text-amber-500 mr-2 h-4 w-4" />
                      )}
                      <span className="text-xs font-medium text-gray-500">
                        Status
                      </span>
                    </div>
                    <p
                      className={`text-sm font-semibold ml-6 ${
                        order.status === "Paid"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
