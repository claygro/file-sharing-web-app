import demoImage from "../assets/images.jpeg";
import { Search, File } from "lucide-react";

const SearchBox = () => {
  return (
    <>
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
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
          <div className="flex-1">
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
          <img
            src={demoImage}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
          />
        </div>
      </header>
    </>
  );
};

export default SearchBox;
