import React, { useEffect, useState } from "react";
import connection from "../config/connection.config";
import { LogOut, Plus } from "lucide-react"; // Optional: icons for better accuracy
import { useNavigate } from "react-router-dom";
const ProfilePopUp = ({
  setIsProfilePopUpShow,
  isProfilePopUpShow,
}: {
  setIsProfilePopUpShow: React.Dispatch<React.SetStateAction<boolean>>;
  isProfilePopUpShow: boolean;
}) => {
  interface AvatarType {
    url: string;
  }
  interface ProfileType {
    avatar: AvatarType;
    userName: string;
    email: string;
    password: string;
  }
  const navigate = useNavigate();
  const [profileData, setPofileData] = useState<ProfileType | null>(null);
  async function getUserProfile() {
    try {
      const response = await connection.get("/profile/profile");
      setPofileData(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error in fetching user profile ${error}`);
      } else {
        console.log(`Error in fetching user profile ${error}`);
      }
    }
  }
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center p-4">
        {/* Main Container */}
        <div className="w-[360px] bg-[#eef3f9] rounded-[40px] p-6 shadow-xl font-sans relative">
          <div className="flex flex-col items-center">
            {/* Email */}
            <p className="text-sm font-medium text-gray-700 mb-4">
              {profileData?.email || "loading..."}
            </p>

            {/* Avatar */}
            <div className="mb-3">
              <img
                src={profileData?.avatar?.url}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>

            {/* Username */}
            <h2 className="text-2xl font-normal text-gray-800 mb-6">
              Hi, {profileData?.userName || "User"}!
            </h2>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {/* Change Profile */}
              <button
                onClick={() => {
                  (navigate("/layout/profile"),
                    setIsProfilePopUpShow(!isProfilePopUpShow));
                }}
                className="flex items-center justify-center gap-2 bg-white py-4 rounded-l-3xl rounded-r-lg hover:bg-gray-50 transition-colors"
              >
                <Plus size={20} className="text-[#0b57d0]" />
                <span className="text-sm font-medium text-gray-700">
                  Change Profile
                </span>
              </button>

              {/* Logout */}
              <button className="flex items-center justify-center gap-2 bg-white py-4 rounded-r-3xl rounded-l-lg hover:bg-gray-50 transition-colors">
                <LogOut size={20} className="text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  Sign out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePopUp;
