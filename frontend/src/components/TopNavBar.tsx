import { useState, useEffect } from "react";
// import demoImage from "../assets/images.jpeg";
import { Search, File, Bell, X, Check } from "lucide-react";
import ProfilePopUp from "./ProfilePopUp";
import connection from "../config/connection.config";
import socket from "../config/socket";
import toast, { Toaster } from "react-hot-toast";
const TopNavBar = () => {
  const [isProfilePopUpShow, setIsProfilePopUpShow] = useState<boolean>(false);
  interface AvatarType {
    url: string;
  }
  interface ProfileType {
    avatar: AvatarType;
  }
  interface NotificationType {
    _id: string;
    senderId: string;
    receiverId: {
      email: string;
      userName: string;
      avatar: {
        url: string;
      };
    };
    status: string;
  }
  interface CookieType {
    username: string;
    avatar: {
      url: string;
    };
    userid: string;
    email: string;
  }
  const [profileData, setPofileData] = useState<ProfileType | null>(null);
  const [notificationData, setNotificationData] = useState<NotificationType[]>(
    [],
  );
  const [isNotificationShow, setIsNotificationShow] = useState<boolean>(false);
  const [cookie, setCookie] = useState<CookieType>();
  async function getCookies() {
    try {
      const token = await connection.get("/cookies/get");
      setCookie(token.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error in getting cookies ${error}`);
      } else {
        console.log(`Error in getting cookies ${error}`);
      }
    }
  }
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

  async function getNotification() {
    try {
      const response = await connection.get("/notification/get");
      setNotificationData(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error in getting notification ${error}`);
      } else {
        console.log(`Error in getting notification ${error}`);
      }
    }
  }
  console.log(notificationData);
  useEffect(() => {
    getCookies();
    getUserProfile();
    getNotification();
  }, []);
  // for websocket
  useEffect(() => {
    if (!cookie?.userid) return;

    // join your room
    socket.emit("join", cookie.userid);

    // listen for real-time notification
    socket.on("new_notification", (data) => {
      // console.log("🔥 New Notification:", data);
      // console.log(data);
      // update state
      setNotificationData((prev) => [data, ...prev]);
      // console.log(data);
      // optional: show toast / alert
      toast.success("New notification for you");
    });

    return () => {
      socket.off("new_notification");
    };
  }, [cookie?.userid]);
  return (
    <>
      <Toaster position="bottom-right" />
      <header className="sticky top-0  bg-white border-b border-gray-200">
        <div className=" px-4 sm:px-6 lg:px-8 py-3 flex justify-around items-center ">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0 mr-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50">
              <File size={16} className="text-indigo-600" />
            </div>
            <span className="font-bold text-sm hidden sm:block text-gray-900">
              FileVault
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search files..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-gray-100 border border-gray-200 focus:bg-white focus:border-gray-300 outline-none transition"
              />
            </div>
          </div>

          {/* Profile */}
          <div className="relative ">
            <div className="flex items-center cursor-pointer gap-20 relative">
              {/* Notification Icon */}
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    (e.stopPropagation(),
                      setIsNotificationShow(!isNotificationShow));
                  }}
                  className="relative"
                >
                  <Bell
                    size={20}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  />

                  {/* Optional: Notification badge */}
                  <span className="absolute -top-1 -right-1 cursor-pointer bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {notificationData?.length}
                  </span>
                </button>
                {isNotificationShow && (
                  <div className="absolute overflow-y-scroll h-52 right-0 mt-3 w-80 bg-white shadow-lg rounded-2xl p-3 space-y-3 z-50">
                    {notificationData.length > 0 ? (
                      notificationData.map((notification) => (
                        <div
                          key={notification._id}
                          className="flex items-center justify-between bg-white shadow-sm rounded-xl p-3 hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={notification.receiverId.avatar.url}
                              alt="user"
                              className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>
                              <h1 className="text-sm font-semibold text-gray-900">
                                {notification.receiverId.userName}
                              </h1>
                              <p className="text-xs text-gray-500">
                                {notification.receiverId.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Accept */}
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 cursor-pointer transition"
                            >
                              <Check size={16} className="text-black" />
                            </button>

                            {/* Reject */}
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 cursor-pointer transition"
                            >
                              <X size={16} className="text-black" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h1>No notification</h1>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfilePopUpShow(!isProfilePopUpShow);
                  }}
                >
                  <img
                    src={profileData?.avatar?.url}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 cursor-pointer"
                  />
                </button>

                {/* Popup */}
                {isProfilePopUpShow && (
                  <div className="absolute right-0 mt-2 z-50">
                    <ProfilePopUp
                      setIsProfilePopUpShow={setIsProfilePopUpShow}
                      isProfilePopUpShow={isProfilePopUpShow}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Popup */}
            {isProfilePopUpShow && (
              <div className="absolute right-0 mt-2 z-50">
                <ProfilePopUp
                  setIsProfilePopUpShow={setIsProfilePopUpShow}
                  isProfilePopUpShow={isProfilePopUpShow}
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default TopNavBar;
