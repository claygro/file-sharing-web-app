import { useState, useEffect, useRef, type ChangeEvent } from "react";
import connection from "../config/connection.config";
import Cropper from "react-cropper";
import type { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import toast, { Toaster } from "react-hot-toast";
import { X, Mail } from "lucide-react";
interface AvatarType {
  url: string;
}

interface ProfileType {
  avatar: AvatarType;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
interface ProfileUpdating {
  userName: string;
  email: string;
  password: string;
}
const Profile = () => {
  const cropRef = useRef<ReactCropperElement>(null);
  const avatarUpdateRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState<ProfileType | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<Blob | null | string>(null);
  const [userUpdatedData, setUserUpdatedData] = useState<ProfileUpdating>({
    userName: "",
    email: "",
    password: "",
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProfileImageView, setIsProfileImageView] = useState<boolean>(false);
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
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 👉 If NOT editing → just enable edit mode
    if (!isEditing) {
      setIsEditing(true);

      // preload data for inputs
      if (profileData) {
        setUserUpdatedData({
          userName: profileData.userName,
          email: profileData.email,
          password: "",
        });
      }

      return; //STOP here
    }

    if (!isEditing) {
      setIsEditing(true);
      if (profileData) {
        setUserUpdatedData({
          userName: profileData.userName,
          email: profileData.email,
          password: "", // Leave blank for security
        });
      }
      return;
    }

    // 2. Perform Update
    setIsLoading(true); // START LOADING HERE
    try {
      const userUpdateData = new FormData();
      if (userUpdatedData.userName) {
        userUpdateData.append("userName", userUpdatedData.userName);
      }
      if (userUpdatedData.password) {
        userUpdateData.append("email", userUpdatedData.email);
      }

      if (userUpdatedData.password) {
        userUpdateData.append("password", userUpdatedData.password);
      }

      if (croppedImage) {
        userUpdateData.append("avatar", croppedImage);
      }

      const response = await connection.put("/profile/update", userUpdateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfileData(response.data);

      setIsEditing(false);
      setCroppedImage(null);
      setPreviewUrl(null);
      setUserUpdatedData({ userName: "", email: "", password: "" });
      window.location.reload();
    } catch (error: unknown) {
      console.error(`Error in updating:`, error);
      toast.error("Update failed. please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageClick = () => {
    // Manually trigger the click on the hidden input
    avatarUpdateRef?.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdatedData({
      ...userUpdatedData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };
  const handleCrop = async () => {
    const cropper = cropRef.current?.cropper;
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({ width: 400, height: 400 });

    canvas.toBlob(
      (blob) => {
        if (blob) {
          // ✅ ONLY FIX: convert Blob → File
          const file = new File([blob], "avatar.jpg", {
            type: "image/jpeg",
          });

          setCroppedImage(file);
          setPreviewUrl(URL.createObjectURL(file));
          setImageSrc(null);
        }
      },
      "image/jpeg",
      0.9,
    );
  };
  let createdTime;
  if (profileData?.updatedAt) {
    createdTime = new Date(profileData?.updatedAt).toLocaleDateString();
  }
  const handleProfileImageClick = () => {
    setIsProfileImageView(true);
  };
  return (
    <>
      <div className="min-h-screen bg-white p-8">
        <Toaster position="top-center" />
        {imageSrc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  Adjust your photo
                </h3>
                <button
                  onClick={() => setImageSrc(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <Cropper
                  src={imageSrc}
                  style={{ height: 400, width: "100%" }}
                  aspectRatio={1}
                  viewMode={1}
                  guides={true}
                  ref={cropRef}
                />
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setImageSrc(null)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCrop}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-20 sm:h-20  rounded-full overflow-hidden shadow-sm">
                {isEditing ? (
                  <>
                    <img
                      onClick={handleImageClick}
                      className="w-full h-full object-cover cursor-pointer"
                      src={previewUrl || profileData?.avatar?.url}
                      alt="Profile"
                    />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageSelect}
                      ref={avatarUpdateRef}
                    />
                  </>
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={profileData?.avatar?.url}
                    alt="Profile"
                    onClick={handleProfileImageClick}
                  />
                )}
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
            {isLoading ? (
              <button
                onClick={handleUpdate}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-lg text-sm sm:text-xl font-medium transition shadow-sm"
              >
                Saving...
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-lg text-sm sm:text-xl font-medium transition shadow-sm"
              >
                {isLoading ? "Saving..." : isEditing ? "Save" : "Edit"}
              </button>
            )}
          </div>

          {/* Form Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Username
              </label>
              {isEditing ? (
                <input
                  className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  value={userUpdatedData?.userName}
                />
              ) : (
                <input
                  type="text"
                  readOnly
                  className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
                  value={profileData?.userName || "Loading..."}
                />
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              {isEditing ? (
                <input
                  className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
                  type="email"
                  name="email"
                  value={userUpdatedData?.email}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  readOnly
                  className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
                  value={profileData?.email || "Loading..."}
                />
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              {isEditing ? (
                <input
                  className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
                  type="password"
                  name="password"
                  value={userUpdatedData?.password}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="password"
                  readOnly
                  className="bg-gray-50 border-none rounded-lg p-3 text-gray-500 focus:ring-0"
                  value="........."
                />
              )}
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              My email Address
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-full text-blue-600">
                <Mail />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {profileData?.email || "Loading..."}
                </p>
                <p className="text-xs text-gray-400">{createdTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* image pop up */}
      <div
        className={`${isProfileImageView ? "flex" : "hidden"} fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm`}
      >
        <div className="relative">
          <img
            src={profileData?.avatar?.url}
            alt="profile"
            className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />

          {/* Optional close button */}
          <button
            className="absolute cursor-pointer top-2 right-2 bg-white/20 hover:bg-white/40 text-black px-3 py-1 rounded-lg"
            onClick={() => setIsProfileImageView(false)}
          >
            <X />
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
