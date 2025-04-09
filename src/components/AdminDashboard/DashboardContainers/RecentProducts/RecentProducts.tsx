import { Link } from "react-router-dom";
import { BookOpen, User, Hash, ArrowRight } from "react-feather";
import { DollarSign } from "lucide-react";
import { useGetProductsQuery } from "../../../../redux/features/product/productApi";
import LoadingSpinner from "../../../Loading/LoadingSpinner";
import { TProduct } from "../../../../types/product.type";

const RecentProducts = () => {
  const {
    data: response = { data: [] },
    isLoading,
    error,
  } = useGetProductsQuery({
    queryParams: {
      limit: 3,
      page: 1,
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error loading products</p>;

  const products = response.data || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Products</h2>
        <Link
          to="/admin/products"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          View All <ArrowRight className="ml-1 h-4 w-4 text-blue-600" />
        </Link>
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No products found</p>
        ) : (
          products.map((product: TProduct) => (
            <div
              key={product._id}
              className=" rounded-lg border border-gray-200 overflow-hidden hover:bg-gray-100 transition-colors"
            >
              <Link to={`/admin/products/${product._id}`} className="block p-4">
                <div className="grid grid-cols-4 gap-4">
                  {/* Title - Primary information (indigo) */}
                  <div className="flex items-center">
                    <BookOpen className="text-indigo-500 mr-3 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-gray-500">Title</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {product.title}
                      </p>
                    </div>
                  </div>

                  {/* Author - Secondary information (sky blue) */}
                  <div className="flex items-center">
                    <User className="text-sky-500 mr-3 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-gray-500">
                        Author
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {product.author}
                      </p>
                    </div>
                  </div>

                  {/* Category - Tertiary information (amber) */}
                  <div className="flex items-center">
                    <Hash className="text-amber-500 mr-3 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-gray-500">
                        Category
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  {/* Price - Financial information (emerald) */}
                  <div className="flex items-center">
                    <DollarSign className="text-emerald-500 mr-3 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-gray-500">Price</p>
                      <p className="text-sm font-semibold text-gray-800">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentProducts;
