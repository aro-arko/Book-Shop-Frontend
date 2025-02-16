/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import BookCard from "../BookCard";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading products</div>;

  // Assuming the API returns a `data` object with a `data` array of products
  const featuredProducts = data?.data?.slice(0, 6); // Display only the first 6 books as featured

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Books</h2>
          <p className="text-gray-600 mt-2">
            Explore our handpicked collection of featured books.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts?.map((product: any) => (
            <BookCard key={product._id} product={product} />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-8">
          <Link
            to="/books"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
