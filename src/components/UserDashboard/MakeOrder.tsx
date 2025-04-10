import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
import { toast } from "sonner";
import OrderItems from "./OrderItems";

const MakeOrder = () => {
  const { data: fetchedUserData, refetch: refetchUser } =
    useGetUserQuery(undefined);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const location = useLocation();
  const cart = location.state?.cart;
  // console.log(cart);

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
      !userData.phone ||
      !userData.address ||
      !userData.city
    ) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    try {
      await updateUser({ email, userData }).unwrap();
      toast.success("Profile updated successfully");
      refetchUser();
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Make Order
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <textarea
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>
          {error && <p className="text-red-500">Error updating profile</p>}
        </form>
        {cart && <OrderItems cart={cart} />}
      </div>
    </div>
  );
};

export default MakeOrder;
