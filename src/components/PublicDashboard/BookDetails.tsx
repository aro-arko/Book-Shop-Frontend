import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../redux/features/product/productApi";
import { useAddToCartMutation } from "../../redux/features/cart/cartApi";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { RootState } from "../../redux/store";
import { toast } from "sonner";

const BookDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId as string);
  const isLoggedIn = useSelector((state: RootState) => state.auth.user);
  const [addToCart] = useAddToCartMutation();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading product details</p>;

  const product = response.data;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location } });
    } else if (product.quantity === 0 || !product.inStock) {
      toast.error("Product is not available.");
    } else {
      try {
        await addToCart({ productId: product._id, quantity: 1 }).unwrap();
        toast.success("Product added to cart!");
      } catch (err) {
        console.error("Failed to add product to cart:", err);
        toast.error("Failed to add product to cart.");
      }
    }
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location } });
    } else if (product.quantity === 0 || !product.inStock) {
      toast.error("Product is not available.");
    } else {
      // Create a cart-like structure for the "Buy Now" flow
      const orderDetails = {
        items: [
          {
            product: {
              _id: product._id,
              image: product.image,
              title: product.title,
              author: product.author,
              price: product.price,
            },
            quantity: 1,
          },
        ],
        totalPrice: product.price, // Since quantity is 1, totalPrice is the product price
      };

      // Navigate to the checkout page with the orderDetails as cart
      navigate("/user/checkout", { state: { cart: orderDetails } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-96 object-cover rounded-md mb-6 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">Author: {product.author}</p>
            <p className="text-gray-600 mb-4">Category: #{product.category}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 font-bold text-2xl mb-4">
              ${product.price}
            </p>
            <p className="text-gray-600 mb-4">Quantity: {product.quantity}</p>
            <p
              className={`text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
