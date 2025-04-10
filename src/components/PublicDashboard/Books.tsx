import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import LoadingSpinner from "../Loading/LoadingSpinner";
import BookCard from "./BookCard";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetFilters from "./ResetFilters";
import { Button } from "../ui/button";
import { Helmet } from "react-helmet";

const Books = () => {
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
    data: products,
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
    navigate("/books");
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

    navigate(`/books?${newParams.toString()}`);
    setIsFilterOpen(false);
  };

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
    .filter((product: Product) => {
      if (selectedCategory) {
        return product.category === selectedCategory;
      }
      return true;
    })
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <Helmet>
        <title>Books</title>
        <meta name="description" content="This is bookshop books page" />
      </Helmet>
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          All Books
        </h1>
      </div>

      {/* Mobile Layout - Filter and Search side by side */}
      <div className="md:hidden flex justify-between items-center mb-4 gap-3">
        {/* Filter Button - Left side */}
        <div className="">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className=" bg-blue-500 mx-auto text-white px-3 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            <FaFilter className="" />
          </Button>
        </div>

        {/* Search Bar - Right side */}
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

      {/* Desktop Layout */}
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FaFilter className="mr-2" />
            Filters
          </button>

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
        </div>

        <div className="flex relative items-center w-1/3">
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

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <BookCard
            key={product._id}
            product={{ ...product, price: parseFloat(product.price) }}
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
