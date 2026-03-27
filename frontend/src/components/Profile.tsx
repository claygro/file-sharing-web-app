import { useState, useEffect } from "react";
import connection from "../config/connection.config";

interface AvatarType {
  url: string;
}

interface ProfileType {
  avatar: AvatarType;
  userName: string;
  email: string;
  createdAt: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileType | null>(null);

  async function getUserProfile() {
    try {
      const response = await connection.get("/profile/profile");
      setProfileData(response.data);
    } catch (error: unknown) {
      console.error(`Error in fetching user profile: ${error}`);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);
  console.log(profileData);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-20 sm:h-20  rounded-full overflow-hidden shadow-sm">
              <img
                className="w-full h-full object-cover"
                src={profileData?.avatar?.url}
                alt="Profile"
              />
            </div>
            <div>
              <h1 className="text-sm sm:text-xl font-bold text-gray-900">
                {profileData?.userName || "Loading..."}
              </h1>
              <p className="text-gray-400 text-sm">
                {profileData?.email || "Loading..."}
              </p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-lg text-sm sm:text-xl font-medium transition shadow-sm">
            Edit
          </button>
        </div>

        {/* Form Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              readOnly
              className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
              value={profileData?.userName || "Loading..."}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="text"
              readOnly
              className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
              value={profileData?.email || "Loading..."}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              readOnly
              className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
              value="............"
            />
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            My email Address
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-full text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {profileData?.email || "Loading..."}
              </p>
              <p className="text-xs text-gray-400">{profileData?.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
