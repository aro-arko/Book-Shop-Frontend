import { useEffect } from "react";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const [login, { data, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    try {
      const res = await login({ email, password }).unwrap();

      const user = verifyToken(res.data.accessToken);

      console.log(user);

      // Set the token in local storage
      localStorage.setItem("token", res.data.accessToken);

      // Dispatch the user data to the store
      dispatch(setUser({ user: { user }, token: res.data.accessToken }));
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("Login response:", data.data);
    }
    if (error) {
      console.error("Login error:", error);
    }
  }, [data, error]);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
