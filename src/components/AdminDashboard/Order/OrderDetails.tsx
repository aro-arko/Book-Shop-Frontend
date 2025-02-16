import { useParams, Link } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../redux/features/order/orderApi";
import UserDetails from "../User/UserDetails"; // Import UserDetails
import OrderProducts from "./OrderProducts"; // Import OrderProducts
import { FaArrowLeft } from "react-icons/fa"; // Import Font Awesome arrow icon
import LoadingSpinner from "../../Loading/LoadingSpinner";

interface Product {
  _id: string;
  product: string;
  quantity: number;
}

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  // console.log("Order ID from params:", id); // Log the order ID to ensure it's being passed correctly

  const { data, isLoading, error } = useGetOrderByIdQuery(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    console.error("Error fetching order details:", error); // Log the error for debugging
    return <p>Error loading order details</p>;
  }

  const order = data?.data;
  // console.log(order);

  if (!order) return <p>No order details available</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex items-center mb-6">
          <Link
            to={`/admin/orders`}
            className="text-gray-800 hover:text-blue-800 transition duration-300"
          >
            <FaArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-semibold text-gray-800 ml-4">
            Order Details
          </h1>
        </div>
        <UserDetails userId={order.user} /> {/* Pass userId to UserDetails */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Order Information
          </h2>
          <p className="text-gray-600">Order ID: {order._id}</p>
          <p className="text-gray-600">Status: {order.status}</p>
          <p className="text-gray-600">
            Total Price: ${order.totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Products</h2>
          {order.products.map((product: Product) => (
            <OrderProducts
              key={product._id}
              productId={product.product}
              quantity={product.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
