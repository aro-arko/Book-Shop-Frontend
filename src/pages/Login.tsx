import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate, Link, useLocation } from "react-router-dom";
import loginImage from "../assets/images/loginIllustration.png";
import { Helmet } from "react-helmet";
import { FiUser, FiLock, FiMail, FiLogIn } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleDemoLogin = async (email: string, password: string) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({ email, password }).unwrap();
      const loginUser = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: loginUser, token: res.data.accessToken }));
      toast.success("Login successful!", { id: toastId });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed. Please try again.", { id: toastId });
      console.error("Login error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({ email, password }).unwrap();
      const loginUser = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: loginUser, token: res.data.accessToken }));
      toast.success("Login successful!", { id: toastId });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed. Please try again.", { id: toastId });
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to your account" />
      </Helmet>
      <div className="w-full max-w-7xl  rounded-xl shadow-lg border border-gray-100 h-[650px] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-1/2 bg-blue-50">
            <img
              src={loginImage}
              alt="Login illustration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-500 text-sm mt-1">
                Sign in to continue to your account
              </p>
            </div>

            {/* Compact Demo Login Buttons */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => handleDemoLogin("arko@bookshop.com", "demo1234")}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg border border-blue-100 transition-colors"
              >
                <FiUser className="text-sm" />
                <span>Demo User</span>
              </button>
              <button
                onClick={() =>
                  handleDemoLogin("admin@bookshop.com", "demo1234")
                }
                className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm bg-green-50 hover:bg-green-100 text-green-600 py-2 px-3 rounded-lg border border-green-100 transition-colors"
              >
                <FaUserShield className="text-sm" />
                <span>Demo Admin</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiLogIn className="mr-2" />
                Sign in
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
