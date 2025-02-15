import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const toastId = toast.loading("Sending reset link...");
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Reset link sent successfully!", { id: toastId });
      setSuccessMessage(
        "Reset link sent successfully! Please check your email."
      );
    } catch (err) {
      toast.error("Failed to send reset link. Please try again.", {
        id: toastId,
      });
      console.error("Forgot password error:", err);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden p-10">
        <div className="card bg-base-100 w-full max-w-lg p-8">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">
              Forgot Password
            </h2>
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                {successMessage}
              </div>
            )}
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
                <button type="submit" className="btn btn-neutral w-full mt-4">
                  Send Reset Link
                </button>
              </fieldset>
            </form>
            <div className="text-center mt-4">
              <p>
                Remembered your password?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
