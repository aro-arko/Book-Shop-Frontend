import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate, Link, useLocation } from "react-router-dom";
import loginImage from "../assets/images/loginIllustration.png";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({ email, password }).unwrap();
      const loginUser = verifyToken(res.data.accessToken);
      // Dispatch the user data to the store
      dispatch(setUser({ user: loginUser, token: res.data.accessToken }));
      toast.success("Login successful!", { id: toastId });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed. Please try again.", { id: toastId });
      console.error("Login error:", err);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden p-10">
        <div className="hidden lg:block lg:w-1/3">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="card bg-base-100 w-full max-w-lg lg:w-2/3 p-8">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-4">
                <div>
                  <label className="fieldset-label block mb-2">Email</label>
                  <input
                    type="email"
                    className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <label className="fieldset-label block mb-2">Password</label>
                  <input
                    type="password"
                    className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="link link-hover text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button type="submit" className="btn btn-neutral w-full mt-4">
                  Login
                </button>
              </fieldset>
            </form>
            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
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
