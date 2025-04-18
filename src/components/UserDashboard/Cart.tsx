import { useEffect } from "react";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../../redux/features/cart/cartApi";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import CartSummary from "./CartSummary";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { data, isLoading, refetch } = useGetCartQuery(undefined);
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <LoadingSpinner />;

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    await updateCart({ productId, quantity });
    refetch();
  };

  const handleRemoveFromCart = async (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeFromCart(productId);
        refetch(); // Refetch the cart data after removing the item
        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const cart = data?.data || { items: [] };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 py-10">
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="This is bookshop user cart page" />
      </Helmet>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.items.map(
            (item: {
              product: {
                _id: string;
                image: string;
                title: string;
                author: string;
                price: number;
              };
              quantity: number;
            }) => (
              <div
                key={item.product._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg transition duration-300 flex flex-col md:flex-row items-center justify-between"
              >
                {/* Left: Image, Title, and Author */}
                <div className="flex items-center space-x-4 flex-1 mb-4 md:mb-0">
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={item.product.image}
                    alt={item.product.title}
                  />
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {item.product.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      by {item.product.author}
                    </p>
                  </div>
                </div>

                {/* Middle: Quantity Input */}
                <div className="flex items-center mx-4 mb-4 md:mb-0">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.product._id, +e.target.value)
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                    min="1"
                  />
                </div>

                {/* Right: Price and Remove Icon */}
                <div className="flex items-center space-x-6">
                  <p className="text-lg font-bold text-gray-800">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-600 transition cursor-pointer"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <CartSummary cart={cart} />
    </div>
  );
};

export default Cart;
