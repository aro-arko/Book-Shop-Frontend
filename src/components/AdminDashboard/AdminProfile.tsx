import { Link, useNavigate } from "react-router-dom"; // For navigation
import { useGetUserQuery } from "../../redux/features/user/userApi";
import profileImg from "../../assets/images/admin.webp";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery(undefined);

  // Destructuring the user data to make the code cleaner
  const { name, email, phone, address, city } = userData?.data || {};

  const handleEditProfile = () => {
    navigate("/admin/profile/edit");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Admin Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Image */}
          <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto overflow-hidden border-4 border-gray-100 my-auto">
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
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
            <Link to="/admin/profile/edit">
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
