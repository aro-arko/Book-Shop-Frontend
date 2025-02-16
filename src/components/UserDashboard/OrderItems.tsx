import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";

interface CartItem {
  product: {
    _id: string;
    image: string;
    title: string;
    author: string;
    price: number;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalPrice: number;
}

const OrderItems = ({ cart }: { cart: Cart }) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  //   const navigate = useNavigate();

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
  }));

  const handleOrderNow = async () => {
    try {
      const response = await createOrder({ products: orderItems }).unwrap();
      const paymentLink = response.data;
      //   toast.success("Order placed successfully");
      window.location.href = paymentLink;
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Items</h1>
      {cart?.items?.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart?.items?.map((item) => (
            <div
              key={item.product._id}
              className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-md transition duration-300 flex items-center justify-between"
            >
              {/* Left: Image, Title, and Author */}
              <div className="flex items-center space-x-6 flex-1">
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  src={item.product.image}
                  alt={item.product.title}
                />
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    {item.product.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    by {item.product.author}
                  </p>
                </div>
              </div>

              {/* Middle: Quantity */}
              <div className="flex items-center mx-6">
                <p className="text-lg text-gray-700">
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>
              </div>

              {/* Right: Price */}
              <div className="flex items-center space-x-6">
                <p className="text-xl font-bold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Price */}
      <div className="mt-10">
        <div className=" p-6 shadow-sm rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Total Price:</h2>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 mb-4">
                ${cart?.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleOrderNow}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Order Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
