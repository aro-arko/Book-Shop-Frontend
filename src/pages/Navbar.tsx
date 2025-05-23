import { useDispatch } from "react-redux";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaShoppingCart, FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logOut } from "../redux/features/auth/authSlice";
import { useState, useEffect } from "react";
import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";
import { useGetCartQuery } from "../redux/features/cart/cartApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data, refetch } = useGetCartQuery(undefined);

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  const cartItems = user ? data?.data?.items || [] : [];

  const handleLogout = () => dispatch(logOut());

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (selectedCategory) queryParams.set("filter", selectedCategory);
    if (inStock) queryParams.set("inStock", "true");
    queryParams.set("minPrice", priceRange[0].toString());
    queryParams.set("maxPrice", priceRange[1].toString());
    navigate(`/books?${queryParams.toString()}`);
    setIsMenuOpen(false);
  };

  const categories = [
    "Fiction",
    "Science",
    "SelfDevelopment",
    "Poetry",
    "Religious",
  ];

  const isBooksActive = location.pathname.startsWith("/books");

  return (
    <nav className="bg-white shadow-md w-full z-50 sticky top-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
            <div className="text-gray-900 font-semibold text-xl">BookShop</div>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-100"
                    : "text-gray-900 hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              Home
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-1 transition-colors focus:outline-none ${
                  isBooksActive
                    ? "text-primary bg-primary/10 border border-primary"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                }`}
              >
                Books
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-[1px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[700px] p-6 grid grid-cols-2 gap-6 shadow-xl border border-gray-100 rounded-lg">
                <div className="space-y-3">
                  <h3 className=" text-sm font-semibold text-gray-900 mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() =>
                          setSelectedCategory((prev) =>
                            prev === cat ? "" : cat
                          )
                        }
                        className={`text-sm px-4 py-1 rounded-full transition-colors duration-200 ${
                          selectedCategory === cat
                            ? "bg-blue-100 text-blue-600 font-semibold "
                            : "bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 hover:text-blue-600"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search books..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStock}
                      onCheckedChange={(val) => setInStock(!!val)}
                      className="border-gray-300"
                    />
                    <label
                      htmlFor="inStock"
                      className="text-sm font-semibold text-gray-900"
                    >
                      In Stock Only
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Price Range
                    </label>
                    <Slider
                      min={0}
                      max={500}
                      value={priceRange}
                      onValueChange={(val) => setPriceRange(val)}
                      step={5}
                      className="relative transition-opacity duration-300"
                      style={
                        {
                          "--slider-selected-opacity": "1",
                          "--slider-unselected-opacity": "0.7",
                        } as React.CSSProperties
                      }
                    />
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSearch}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary bg-primary/20"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary bg-primary/20"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              FAQ
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary bg-primary/20"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          <div className="flex items-center">
            {user && (
              <Link to="/user/cart" className="relative mr-6">
                <div>
                  <FaShoppingCart className="text-xl text-gray-700" />
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <motion.div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaUserCircle className="text-2xl" />
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 py-1 shadow-lg rounded-md bg-white border border-gray-100">
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/user/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/user/change-password"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="hidden font-semibold md:block">
                <Link to="/login">Login</Link>
              </Button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-primary/10 focus:outline-none"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg border-t border-gray-100"
        >
          <div className="px-4 py-3 space-y-2">
            <NavLink
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <div className="px-3 py-2">
              <NavLink to="/books">
                <button
                  className="w-full text-left flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-base font-medium text-gray-700">
                    Books
                  </span>
                </button>
              </NavLink>
            </div>

            <NavLink
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </NavLink>

            <NavLink
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>

            {!user && (
              <Button asChild className="w-full mt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
