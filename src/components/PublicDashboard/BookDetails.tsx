import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/product/productApi";
import LoadingSpinner from "../Loading/LoadingSpinner";

const BookDetails = () => {
  const { productId } = useParams();
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId as string);

  console.log(productId);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading product details</p>;

  const product = response.data;

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
