import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import {
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
} from "react-feather";

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  subject?: string;
}

const AllOrders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error loading orders</p>;

  const orders = data?.data || [];

  const totalRevenue = orders
    .filter((order: Order) => order.status === "Paid")
    .reduce((acc: number, order: Order) => acc + order.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-2 text-center">
        <h1 className="text-3xl font-bold text-gray-800 sm:mb-0">All Orders</h1>
        <p className="text-gray-600 pt-2">
          View and manage all your orders from here.
        </p>
      </div>
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center mb-8">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className=" font-semibold text-gray-700">
              Total Revenue:{" "}
              <span className="text-blue-600">${totalRevenue.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link to={`/admin/orders/${order._id}`} className="block p-6">
                {/* Mobile View - Stacked */}
                <div className="md:hidden space-y-4">
                  <div className="flex items-start">
                    <FileText className="text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Booking ID
                      </p>
                      <p className="text-base font-semibold text-gray-800 truncate">
                        {order._id}
                      </p>
                    </div>
                  </div>

                  {order.subject && (
                    <div className="flex items-start">
                      <FileText className="text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Subject
                        </p>
                        <p className="text-base font-semibold text-gray-800">
                          {order.subject}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <Calendar className="text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-base font-semibold text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Price</p>
                      <p className="text-base font-semibold text-gray-800">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    {order.status === "Paid" ? (
                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <Clock className="text-yellow-500 mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <p
                        className={`text-base font-semibold ${
                          order.status === "Paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop View - Inline */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex items-center w-1/4 min-w-[200px]">
                    <FileText className="text-gray-500 mr-3 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-sm font-medium text-gray-500">
                        Booking ID
                      </p>
                      <p className="text-base font-semibold text-gray-800 truncate">
                        {order._id}
                      </p>
                    </div>
                  </div>

                  {order.subject && (
                    <div className="flex items-center w-1/4 min-w-[200px]">
                      <FileText className="text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Subject
                        </p>
                        <p className="text-base font-semibold text-gray-800 truncate">
                          {order.subject}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center w-1/4 min-w-[150px]">
                    <Calendar className="text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-base font-semibold text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center w-1/4 min-w-[100px]">
                    <DollarSign className="text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Price</p>
                      <p className="text-base font-semibold text-gray-800">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center w-1/4 min-w-[120px]">
                    {order.status === "Paid" ? (
                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <Clock className="text-yellow-500 mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <p
                        className={`text-base font-semibold ${
                          order.status === "Paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
