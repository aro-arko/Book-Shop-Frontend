import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";
import LoadingSpinner from "../../Loading/LoadingSpinner";

interface Order {
  _id: string;
  user: string;
  createdAt: string;
  totalPrice: number;
  status: string;
}

const AllOrders = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading orders</p>;

  const orders = data?.data || [];

  const totalRevenue = orders
    .filter((order: Order) => order.status === "Paid")
    .reduce((acc: number, order: Order) => acc + order.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">All Orders</h1>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-gray-800">
              Total Revenue: ${totalRevenue.toFixed(2)}
            </h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  Total
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order, index: number) => (
                <tr
                  key={order._id}
                  className={`${
                    index % 2 !== 0 ? "bg-gray-200" : "bg-white"
                  } hover:bg-gray-300 transition-colors`}
                >
                  <td className="py-4 px-6 border-b border-gray-300">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {order._id}
                    </Link>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {order.user}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
