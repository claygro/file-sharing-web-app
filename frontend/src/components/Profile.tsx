import { useState, useEffect } from "react";
import connection from "../config/connection.config";

interface AvatarType {
  url: string;
}

interface ProfileType {
  avatar: AvatarType;
  userName: string;
  email: string;
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

  return (
    <div className="h-dvh m-[-14px] w-full flex items-center justify-center bg-gray-100 p-4">
      {/* Profile Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Profile</h1>

        {/* Avatar */}
        <div className="relative">
          <div className="ring-4 ring-blue-500 rounded-full overflow-hidden w-32 h-32 shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={
                profileData?.avatar?.url ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full mt-10 space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              Username
            </span>
            <p className="text-lg font-semibold text-gray-700">
              {profileData?.userName || "Loading..."}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              Email Address
            </span>
            <p className="text-lg font-semibold text-gray-700 break-all">
              {profileData?.email || "Loading..."}
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition active:scale-95">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
