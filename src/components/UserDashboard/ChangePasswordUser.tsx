import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../../redux/features/auth/authApi";
import { Helmet } from "react-helmet";

const ChangePasswordUser = () => {
  const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password updated successfully");
      navigate("/user/profile");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to update password:", err);
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Helmet>
        <title>Change Password</title>
        <meta name="description" content="This is user change password page" />
      </Helmet>
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Change Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Old Password
            </label>
            <input
              type="password"
              placeholder="Enter your old password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm New Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition duration-300"
              onClick={() => navigate("/user/profile")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
          {error && <p className="text-red-500">Error updating password</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordUser;
