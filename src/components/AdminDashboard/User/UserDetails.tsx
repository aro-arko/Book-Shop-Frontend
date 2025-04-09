import React from "react";
import { useGetUserByIdQuery } from "../../../redux/features/user/userApi";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import { User, Mail, Phone, MapPin, Home } from "react-feather";

interface UserDetailsProps {
  userId: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const { data, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error loading user details</p>;

  const user = data?.data;
  if (!user) return <p className="text-gray-500">No user details available</p>;

  return (
    <div className="mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <User className="mr-2 text-blue-500" />
          User Information
        </h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <User className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base font-semibold text-gray-800">
                {user.name || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base font-semibold text-gray-800">
                {user.email || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-base font-semibold text-gray-800">
                {user.phone || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">City</p>
              <p className="text-base font-semibold text-gray-800">
                {user.city || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Home className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-base font-semibold text-gray-800">
                {user.address || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
