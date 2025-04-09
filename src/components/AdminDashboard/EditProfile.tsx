import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
import { toast } from "sonner";

const EditProfile = () => {
  const { data: fetchedUserData, refetch } = useGetUserQuery(undefined);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (fetchedUserData) {
      setEmail(fetchedUserData.data.email || "");
      setUserData({
        name: fetchedUserData.data.name || "",
        phone: fetchedUserData.data.phone || "",
        address: fetchedUserData.data.address || "",
        city: fetchedUserData.data.city || "",
      });
    }
  }, [fetchedUserData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userData.name ||
      userData.name === "N/A" ||
      !userData.phone ||
      userData.phone === "N/A" ||
      !userData.address ||
      userData.address === "N/A" ||
      !userData.city ||
      userData.city === "N/A"
    ) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    try {
      await updateUser({ email, userData }).unwrap();
      toast.success("Profile updated successfully");
      refetch();
      navigate("/admin/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col">
      <div className="mx-auto text-center">
        <div className="mb-8 ">
          <h1 className="text-2xl md:text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-800 mt-2">Update your profile information</p>
        </div>
      </div>
      <div className="flex-grow p-4 sm:p-6 lg:p-8 w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                    value={email}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={userData.city}
                    onChange={(e) =>
                      setUserData({ ...userData, city: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows={3}
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Link
                  to="/admin/profile"
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-center">
                  Error updating profile. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
