import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaShoppingCart } from "react-icons/fa";
import { logOut } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { RootState } from "../redux/store"; // Adjust the import path as needed
import { useAppSelector } from "../redux/hooks";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-base-100 shadow-sm w-full z-50 sticky top-0">
      <div className="navbar max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="btn btn-ghost text-xl">
            BookShop
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 justify-center flex-1">
          <Link to="/home" className="btn btn-ghost">
            Home
          </Link>
          <Link to="/books" className="btn btn-ghost">
            Books
          </Link>
          <Link to="/about" className="btn btn-ghost">
            About
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <Link to="/cart">
                    <FaShoppingCart className="text-2xl" />
                  </Link>
                  <span className="badge badge-sm bg-gray-200 indicator-item">
                    8
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <Link to="/cart" className="btn btn-primary btn-block">
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                  <FaUserCircle className="text-3xl" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/admin/change-password">Change Password</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Login
            </Link>
          )}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 shadow-sm w-full z-50">
          <div className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="btn btn-ghost"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/books"
              className="btn btn-ghost"
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/about"
              className="btn btn-ghost"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="btn btn-ghost"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!user && (
              <Link
                to="/login"
                className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
