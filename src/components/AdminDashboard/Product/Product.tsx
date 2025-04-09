import { Package } from "lucide-react";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";

const Product = () => {
  const {
    data: response = { data: [], total: 0 },
    isLoading,
    error,
  } = useGetProductsQuery({
    queryParams: {
      page: 1,
      limit: Number.MAX_SAFE_INTEGER,
    },
  });

  // console.log(response);

  const totalProducts = response?.data?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col items-center">
      <div className="bg-blue-100 p-3 rounded-full mb-4">
        <Package className="h-6 w-6 text-blue-600" />
      </div>

      <h3 className="text-lg font-medium text-gray-500 mb-1">Products</h3>

      {isLoading ? (
        <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin" />
      ) : error ? (
        <p className="text-red-500 text-sm">Error loading</p>
      ) : (
        <p className="text-2xl font-bold text-gray-800">
          {totalProducts.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default Product;
