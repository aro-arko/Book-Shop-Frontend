import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import registerImage from "../assets/images/login.png";

const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Registering...");
    try {
      await register(formData).unwrap();
      toast.success("Registration successful!", { id: toastId });
      navigate("/login");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (err as any)?.data?.message || "Registration failed";
      toast.error(errorMessage, { id: toastId });
      // console.error("Registration error:", err);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden p-10">
        <div className="hidden lg:block lg:w-1/3">
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="card bg-base-100 w-full max-w-lg lg:w-2/3 p-8">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-4">
                <div>
                  <label className="fieldset-label block mb-2">Name</label>
                  <input
                    type="text"
                    className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="fieldset-label block mb-2">Phone</label>
                  <input
                    type="text"
                    className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="fieldset-label block mb-2">Email</label>
                  <input
                    type="email"
                    className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-neutral w-full mt-4">
                  Register
                </button>
              </fieldset>
            </form>
            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
