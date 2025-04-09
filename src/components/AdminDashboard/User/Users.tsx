import { Users as UsersIcon } from "lucide-react";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";

const Users = () => {
  const { data: response, isLoading, error } = useGetAllUsersQuery({});

  const totalUsers = response?.data?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col items-center">
      <div className="bg-purple-100 p-3 rounded-full mb-4">
        <UsersIcon className="h-6 w-6 text-purple-600" />
      </div>

      <h3 className="text-lg font-medium text-gray-500 mb-1">Users</h3>

      {isLoading ? (
        <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-purple-500 animate-spin" />
      ) : error ? (
        <p className="text-red-500 text-sm">Error loading</p>
      ) : (
        <p className="text-2xl font-bold text-gray-800">
          {totalUsers.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default Users;
