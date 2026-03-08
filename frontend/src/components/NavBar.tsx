import { NavLink } from "react-router-dom";
import {
  Home,
  Folder,
  Share2,
  History,
  Clock,
  Settings,
  Plus,
  Menu, // Added for the toggle
} from "lucide-react";
import { useState } from "react";
import UploadFilePopUp from "./UploadFilePopUp";
const NavBar = () => {
  const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // UI State for toggle

  const handleUploadFile = () => {
    setIsShowPopUp(true);
    console.log(isShowPopUp);
  };

  const navClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer mb-1 whitespace-nowrap";

  return (
    <nav
      className={`flex flex-col justify-between h-full bg-white border-r border-gray-100 p-3 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="space-y-2">
        {/* Toggle Button / Hamburger */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 mb-4 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
        >
          <Menu size={24} />
        </button>

        <button
          onClick={handleUploadFile}
          className={`flex items-center gap-3 mb-8 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95 ${
            isCollapsed ? "p-3 mx-auto" : "px-6 py-3 w-full"
          }`}
        >
          <Plus size={20} strokeWidth={3} />
          {!isCollapsed && (
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "opacity-0 w-0 translate-x-[-10px]"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              New
            </span>
          )}
        </button>

        {/* showing file uploading pop up box */}
        {isShowPopUp && (
          <div className="fixed inset-0  flex items-center justify-center bg-white/40 backdrop-blur-sm z-50 h-dvh w-dvw">
            {/* Note: Ensure UploadFilePopUp has its own background/styling */}
            <UploadFilePopUp setIsShowPopUp={setIsShowPopUp} />
          </div>
        )}

        <NavLink
          to="/layout"
          end
          className={({ isActive }) =>
            `${navClass} ${isCollapsed ? "justify-center" : ""} ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Home size={20} />
          {!isCollapsed && (
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "opacity-0 w-0 translate-x-[-10px]"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              Home
            </span>
          )}
        </NavLink>

        <NavLink
          to="/layout/mydrive"
          className={({ isActive }) =>
            `${navClass} ${isCollapsed ? "justify-center" : ""} ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Folder size={20} />
          {!isCollapsed && (
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "opacity-0 w-0 translate-x-[-10px]"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              My Drive
            </span>
          )}
        </NavLink>

        <NavLink
          to="/layout/share"
          className={({ isActive }) =>
            `${navClass} ${isCollapsed ? "justify-center" : ""} ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Share2 size={20} />
          {!isCollapsed && (
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "opacity-0 w-0 translate-x-[-10px]"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              Share
            </span>
          )}
        </NavLink>

        <NavLink
          to="/layout/history"
          className={({ isActive }) =>
            `${navClass} ${isCollapsed ? "justify-center" : ""} ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <History size={20} />
          {!isCollapsed && (
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "opacity-0 w-0 translate-x-[-10px]"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              History
            </span>
          )}
        </NavLink>

        <NavLink
          to="/layout/recents"
          className={({ isActive }) =>
            `${navClass} ${isCollapsed ? "justify-center" : ""} ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Clock size={20} />
          {!isCollapsed && (
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "opacity-0 w-0 translate-x-[-10px]"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              Recent
            </span>
          )}
        </NavLink>

        <NavLink
          to="/layout/setting"
          className={({ isActive }) =>
            `${navClass} ${isCollapsed ? "justify-center" : ""} ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Settings size={20} />
          {!isCollapsed && (
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed
                  ? "opacity-0 w-0 translate-x-[-10px]"
                  : "opacity-100 w-auto translate-x-0"
              }`}
            >
              Setting
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
