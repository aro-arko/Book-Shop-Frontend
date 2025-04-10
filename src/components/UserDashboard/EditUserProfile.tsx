import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
import { toast } from "sonner";

const EditUserProfile = () => {
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
      navigate("/user/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col">
      <div className="mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-800 mt-2">Update your profile information</p>
        </div>
      </div>
      <div className="flex-grow p-4 lg:p-0 w-full mx-auto max-w-7xl">
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

              <div className="flex justify-between pt-4">
                <Link
                  to="/user/profile"
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center pt-2">
                  Error updating profile
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
