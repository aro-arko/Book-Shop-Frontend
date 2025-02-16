import React from "react";
import { useGetUserByIdQuery } from "../../../redux/features/user/userApi";
import LoadingSpinner from "../../Loading/LoadingSpinner";

interface UserDetailsProps {
  userId: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const { data, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading user details</p>;

  const user = data?.data;

  if (!user) return <p>No user details available</p>;

  return (
    <div className="mb-6">
      <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          User Information
        </h2>
        <p className="text-gray-600">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="text-gray-600">
          <strong>City:</strong> {user.city}
        </p>
        <p className="text-gray-600">
          <strong>Address:</strong> {user.address}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
