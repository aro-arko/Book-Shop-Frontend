import { Link } from "react-router-dom";

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
  console.log(cart);

  return (
    <div className="flex justify-end items-center mt-6">
      <div className="flex flex-col justify-between items-end w-1/3 bg-white shadow-md rounded-lg p-4 border border-gray-300">
        <div className="flex justify-between w-full mb-4">
          <p className="text-gray-600">Total Price:</p>
          <p className="text-2xl font-bold text-gray-800">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <p className="text-gray-600 mb-4">
          Thank you for shopping with us! Click the button below to place your
          order and enjoy your new books.
        </p>
        <Link to="/user/checkout" state={{ cart }}>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
