import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../../redux/features/product/productApi";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId as string);
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details</p>;

  const product = response.data;

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId as string).unwrap();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          navigate("/admin/products");
        } catch (err) {
          console.error("Failed to delete the product:", err);
          Swal.fire("Error!", "Failed to delete the product.", "error");
        }
      }
    });
  };

  const handleUpdate = async () => {
    try {
      await refetch(); // Refetch the product details after update
    } catch (err) {
      console.error("Failed to refetch the product:", err);
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
              <Link to={`/admin/products/update/${product._id}`}>
                <button
                  onClick={handleUpdate}
                  className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Edit Product
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
