import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import { TProduct } from "../../../types/product.type";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import { FaFilter, FaSearch } from "react-icons/fa";
import { Button } from "../../ui/button";
import ResetFilters from "../../PublicDashboard/ResetFilters";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [params] = useSearchParams();
  const queryParams = Object.fromEntries([...params]);
  const navigate = useNavigate();

  const {
    data: response = { data: [] },
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    queryParams: {
      ...queryParams,
      page,
      limit: 12,
    },
  });

  const resetAllFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 100]);
    setAvailability("");
    setSortOption("title");
    setSearchQuery("");
    setPage(1);
    navigate("/admin/products");
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();

    if (selectedCategory) newParams.set("category", selectedCategory);
    if (priceRange[0] !== 0)
      newParams.set("minPrice", priceRange[0].toString());
    if (priceRange[1] !== 100)
      newParams.set("maxPrice", priceRange[1].toString());
    if (availability)
      newParams.set("inStock", availability === "inStock" ? "true" : "false");
    if (sortOption !== "title") newParams.set("sort", sortOption);
    if (page !== 1) newParams.set("page", page.toString());

    navigate(`/admin/products?${newParams.toString()}`);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  const products = response.data;

  const filteredProducts = products
    .filter((product: TProduct) =>
      (product[searchField as keyof TProduct] ?? "")
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter((product: TProduct) => {
      if (selectedCategory) {
        return product.category === selectedCategory;
      }
      return true;
    })
    .filter(
      (product: TProduct) =>
        parseFloat(product.price.toString()) >= priceRange[0] &&
        parseFloat(product.price.toString()) <= priceRange[1]
    )
    .filter((product: TProduct) =>
      availability ? product.inStock === (availability === "inStock") : true
    )
    .sort((a: TProduct, b: TProduct) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "price") {
        return parseFloat(a.price.toString()) - parseFloat(b.price.toString());
      } else if (sortOption === "author") {
        return a.author.localeCompare(b.author);
      }
      return 0;
    });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading products</div>;

  return (
    <div className="min-h-screen py-10 rounded-xl px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          All Products
        </h1>
        <p className="text-gray-700 text-center mt-2">
          Manage your products efficiently
        </p>
      </div>
      <div className=" mx-auto md:bg-white md:shadow-lg rounded-2xl px-0 md:px-8 py-4 md:py-16 md:border md:border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Mobile Layout - Filter and Search side by side */}
          <div className="md:hidden flex justify-between items-center w-full gap-3">
            {/* Filter Button */}
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-blue-500 text-white px-3 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              <FaFilter />
            </Button>

            {/* Search Bar */}
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder={`Search by ${searchField}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center w-full">
            <div className="relative">
              <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FaFilter className="mr-2" />
                Filters
              </Button>

              {isFilterOpen && (
                <div className="absolute left-0 top-full mt-2 z-50 w-96 bg-white p-4 rounded-lg shadow-xl border border-gray-200">
                  <h2 className="text-xl font-bold mb-4">Filters</h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="">All Categories</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Science">Science</option>
                      <option value="SelfDevelopment">Self Development</option>
                      <option value="Poetry">Poetry</option>
                      <option value="Religious">Religious</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="">All</option>
                      <option value="inStock">In Stock</option>
                      <option value="outOfStock">Out of Stock</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort By
                    </label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="title">Title</option>
                      <option value="price">Price</option>
                      <option value="author">Author</option>
                    </select>
                  </div>

                  <div className="flex justify-between gap-2">
                    <ResetFilters onClick={resetAllFilters} />
                    <button
                      onClick={applyFilters}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition text-sm"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4">
              <div className="flex relative items-center">
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

            {/* Add Product Button */}
            {/* <Link to="/admin/products/create-product">
              <Button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                Add New Product
              </Button>
            </Link> */}
          </div>
        </div>

        {/* Mobile Filter Dropdown */}
        {isFilterOpen && (
          <div className="md:hidden bg-white p-4 rounded-lg shadow-xl border border-gray-200 mb-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="SelfDevelopment">Self Development</option>
                <option value="Poetry">Poetry</option>
                <option value="Religious">Religious</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="author">Author</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <ResetFilters onClick={resetAllFilters} />
              <button
                onClick={applyFilters}
                className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
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
            disabled={products.length < 12}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
