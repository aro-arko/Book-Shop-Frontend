import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav className="bg-base-100 shadow-sm w-full z-50 sticky top-0">
      <div className="navbar max-w-7xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            BookShop
          </Link>
        </div>
        <div className="flex-none">
          {/* Profile Dropdown */}
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
                <Link to="/admin/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
