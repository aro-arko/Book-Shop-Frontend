import { Link } from "react-router-dom";
import { toast } from "sonner";

interface CartItem {
  product: {
    price: number;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

const CartSummary = ({ cart }: { cart: Cart }) => {
  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckoutClick = () => {
    if (cart.items.length === 0) {
      toast.error(
        "Please add products to the cart before proceeding to checkout."
      );
    }
  };

  return (
    <div className="flex justify-center md:justify-end items-center mt-6">
      <div className="flex flex-col justify-between items-end w-full md:w-1/2 bg-white shadow-md rounded-lg p-4 border border-gray-300">
        <div className="flex justify-between w-full mb-4">
          <p className="text-gray-600">Total Price:</p>
          <p className="text-2xl font-bold text-gray-800">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <p className="text-gray-600 mb-4 text-center md:text-right">
          Thank you for shopping with us! Click the button below to place your
          order and enjoy your new books.
        </p>
        <Link
          to={cart.items.length > 0 ? "/user/checkout" : "#"}
          state={{ cart }}
        >
          <button
            className={`bg-blue-500 text-white px-6 py-2 rounded-lg transition duration-300 w-full md:w-auto ${
              cart.items.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            onClick={handleCheckoutClick}
            disabled={cart.items.length === 0}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
