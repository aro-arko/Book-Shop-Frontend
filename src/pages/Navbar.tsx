import { useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
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
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
            }
          >
            Books
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <Link to="/cart">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <FaShoppingCart className="text-2xl" />

                  <span className="badge badge-sm bg-gray-200 indicator-item">
                    8
                  </span>
                </div>
              </div>
            </Link>
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
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "btn btn-ghost text-blue-500" : "btn btn-ghost "
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
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
