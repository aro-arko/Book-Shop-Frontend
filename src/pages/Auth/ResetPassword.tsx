import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resetPassword] = useResetPasswordMutation();
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const toastId = toast.loading("Resetting password...");
    try {
      await resetPassword({ email, token, newPassword }).unwrap();
      toast.success("Password reset successfully!", { id: toastId });
      navigate("/login");
    } catch (err) {
      toast.error("Failed to reset password. Please try again.", {
        id: toastId,
      });
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden p-10">
        <div className="card bg-base-100 w-full max-w-lg p-8">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">
              Reset Password
            </h2>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-4">
                <div>
                  <label className="fieldset-label block mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="fieldset-label block mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-neutral w-full mt-4">
                  Reset Password
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

export default ResetPassword;
