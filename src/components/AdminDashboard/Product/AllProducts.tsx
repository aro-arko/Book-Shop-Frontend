import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import { TProduct } from "../../../types/product.type";
import LoadingSpinner from "../../Loading/LoadingSpinner";

const AllProducts = () => {
  const {
    data: response = { data: [] },
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const products = response.data;

  const filteredProducts = products.filter((product: TProduct) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">All Products</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/admin/products/create-product">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Add New Product
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: TProduct) => (
            <Link to={`/admin/products/${product._id}`} key={product._id}>
              <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 hover:shadow-lg transition duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.title}
                </h2>
                <p className="text-gray-600">{product.author}</p>
                <p className="text-gray-600">#{product.category}</p>
                <p className="text-gray-600 truncate">{product.description}</p>
                <p className="text-gray-800 font-bold">${product.price}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p
                  className={`text-sm ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
