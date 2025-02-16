import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import LoadingSpinner from "../Loading/LoadingSpinner";
import BookCard from "./BookCard";
import { FaFilter, FaSearch } from "react-icons/fa";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control filter overlay

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    category: selectedCategory,
    page,
    limit: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading products</div>;

  interface Product {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    price: string;
    image: string;
    inStock: boolean;
  }

  interface ProductsData {
    data: Product[];
  }

  const filteredProducts = (products as ProductsData).data
    .filter((product: Product) =>
      product[searchField as keyof Product]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter(
      (product: Product) =>
        parseFloat(product.price) >= priceRange[0] &&
        parseFloat(product.price) <= priceRange[1]
    )
    .filter((product: Product) =>
      availability ? product.inStock === (availability === "inStock") : true
    )
    .sort((a: Product, b: Product) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "price") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOption === "author") {
        return a.author.localeCompare(b.author);
      }
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">All Books</h1>
      </div>

      {/* Search Bar and Filter Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <FaFilter className="mr-2" />
          Filters
        </button>

        {/* Search Bar */}
        <div className="relative flex items-center w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder={`Search by ${searchField}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="ml-2 bg-white border border-gray-300 rounded-lg py-2 px-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>

      {/* Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex justify-center items-start z-50 pt-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full mt-1 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="SelfDevelopment">Self Development</option>
                <option value="Poetry">Poetry</option>
                <option value="Religious">Religious</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-1/2 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-1/2 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full mt-1 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>

            {/* Sorting Options */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full mt-1 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="author">Author</option>
              </select>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <BookCard
            key={product._id}
            image={product.image}
            title={product.title}
            author={product.author}
            category={product.category}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={products.data.length < 12}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
