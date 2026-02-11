import { NavLink } from "react-router-dom";
import {
  Home,
  Folder,
  Share2,
  History,
  Clock,
  Settings,
  Plus,
} from "lucide-react";
const NavBar = () => {
  const navClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer";

  return (
    <nav className="flex flex-col justify-between h-dvh w-60 bg-white border-r p-4">
      {/* Top Section */}
      <div className="space-y-2">
        <button className="flex items-center gap-3 mb-22 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          <Plus size={18} />
          New
        </button>

        <NavLink
          to="/layout"
          end // Only mark this link as active if the URL matches exactly. otherwise unmark it means end it.
          className={({ isActive }) =>
            `${navClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`
          }
        >
          <Home size={18} />
          Home
        </NavLink>

        <NavLink
          to="/layout/mydrive"
          className={({ isActive }) =>
            `${navClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`
          }
        >
          <Folder size={18} />
          My Drive
        </NavLink>

        <NavLink
          to="/layout/share"
          className={({ isActive }) =>
            `${navClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`
          }
        >
          <Share2 size={18} />
          Share
        </NavLink>

        <NavLink
          to="/layout/history"
          className={({ isActive }) =>
            `${navClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`
          }
        >
          <History size={18} />
          History
        </NavLink>

        <NavLink
          to="/layout/recents"
          className={({ isActive }) =>
            `${navClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`
          }
        >
          <Clock size={18} />
          Recent
        </NavLink>

        <NavLink
          to="/layout/setting"
          className={({ isActive }) =>
            `${navClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`
          }
        >
          <Settings size={18} />
          Setting
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
