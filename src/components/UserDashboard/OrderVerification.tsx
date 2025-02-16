import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useOwnOrdersQuery,
  useVerifyPaymentQuery,
} from "../../redux/features/order/orderApi";
import LoadingSpinner from "../Loading/LoadingSpinner";

const OrderVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");

  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useOwnOrdersQuery(undefined);
  const { isLoading: paymentLoading, error: paymentError } =
    useVerifyPaymentQuery(orderId || "");

  useEffect(() => {
    if (!paymentLoading && paymentError) {
      navigate("/", {
        state: { error: "Payment verification failed. Please try again." },
      });
    }
  }, [paymentLoading, paymentError, navigate]);

  if (ordersLoading || paymentLoading) return <LoadingSpinner />;
  if (ordersError) return <p>Error loading orders</p>;

  const order = ordersData?.data[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8 text-center">
        {/* Icon or Illustration */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Order Successful! 🎉
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase! Your order has been successfully placed.
        </p>

        {/* Order Details */}
        {order && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Order ID:</span> {order._id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total Amount:</span> $
                {order.totalPrice}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Payment:</span> Online Pay
              </p>
            </div>
          </div>
        )}

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Return to Home Page
        </Link>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          Need help?{" "}
          <Link to="/contact" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrderVerification;
