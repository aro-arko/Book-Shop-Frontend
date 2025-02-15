import { Link, useNavigate } from "react-router-dom"; // For navigation
import { useGetUserQuery } from "../../redux/features/user/userApi";
import profileImg from "../../assets/images/profile.png";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery(undefined);

  // Destructuring the user data to make the code cleaner
  const { name, email, phone, address, city } = userData?.data || {};

  const handleEditProfile = () => {
    navigate("/admin/profile/edit");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          Admin Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-end items-center order-1 md:order-2">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
              {/* Profile image if exists, else placeholder */}
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4 order-2 md:order-1">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700 text-lg">Name:</span>
              <span className="text-gray-600 text-lg">{name || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700 text-lg">
                Email:
              </span>
              <span className="text-gray-600 text-lg">{email || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700 text-lg">
                Phone:
              </span>
              <span className="text-gray-600 text-lg">{phone || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700 text-lg">
                Address:
              </span>
              <span className="text-gray-600 text-lg">{address || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-700 text-lg">City:</span>
              <span className="text-gray-600 text-lg">{city || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8 flex justify-center md:justify-start">
          <Link to="/admin/profile/edit">
            <button
              onClick={handleEditProfile}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-xl font-medium hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
