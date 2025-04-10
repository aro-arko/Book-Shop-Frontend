import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../redux/features/user/userApi";
import profileImg from "../../assets/images/admin.webp";
import { Helmet } from "react-helmet";

const UserProfile = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery(undefined);

  const { name, email, phone, address, city } = userData?.data || {};

  const handleEditProfile = () => {
    navigate("/user/profile/edit");
  };

  return (
    <div className="min-h-screen max-w-7xl py-8 px-4 lg:px-0 mx-auto">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="This is user profile page" />
      </Helmet>
      <div className="mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600 mt-2">
            View and manage your profile information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Profile Image at Top */}
          <div className="flex justify-center pt-8">
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full border-2 border-blue-100"></div>
            </div>
          </div>

          {/* Profile Details Below Image */}
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold">
                    {name || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold">
                    {email || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-lg font-semibold">
                    {phone || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">City</p>
                  <p className="text-lg font-semibold">
                    {city || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="space-y-1 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-lg font-semibold">
                  {address || "Not provided"}
                </p>
              </div>

              {/* Edit Profile Button */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleEditProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
