import { useEffect, useState } from "react";
import connection from "../config/connection.config";
import demoImage from "../assets/images.jpeg";
import { Search, File } from "lucide-react";

const Home = () => {
  interface FileDataType {
    id: string;
    sizeOfFileInKb: number;
    sizeOfFileInMb: number;
    title: string;
    createdAt: string;
    fileType: string;
  }

  const [fileData, setFileData] = useState<FileDataType[]>();
  const [searchQuery, setSearchQuery] = useState("");

  async function retriveFileData() {
    try {
      const fileResponse = await connection.get("/retrive/file");
      setFileData(fileResponse.data);
    } catch (error: unknown) {
      console.log(`Error retrieving file: ${error}`);
    }
  }

  useEffect(() => {
    retriveFileData();
  }, []);

  const filtered = fileData?.filter(
    (f) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.fileType.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">My Files</h1>
          <p className="text-sm text-gray-500">
            {filtered
              ? `${filtered.length} file${filtered.length !== 1 ? "s" : ""}`
              : "Loading..."}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr className="text-left text-gray-500 uppercase text-xs">
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-5 hidden sm:table-cell">Type</th>
                  <th className="py-3 px-5 hidden md:table-cell text-right">
                    Size
                  </th>
                  <th className="py-3 px-5 text-right">Created</th>
                </tr>
              </thead>

              <tbody>
                {filtered?.map((file, i) => (
                  <tr
                    key={file.id}
                    className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition"
                  >
                    {/* Name */}
                    <td className="py-4 px-5">
                      <p className="font-medium text-gray-900 truncate max-w-[200px]">
                        {file.title}
                      </p>
                      <p className="text-xs text-gray-400 sm:hidden mt-1 uppercase">
                        {file.fileType}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-5 hidden sm:table-cell text-gray-600 uppercase text-xs">
                      {file.fileType}
                    </td>

                    {/* Size */}
                    <td className="py-4 px-5 hidden md:table-cell text-right text-gray-700">
                      {file.sizeOfFileInMb >= 1
                        ? `${file.sizeOfFileInMb.toFixed(1)} MB`
                        : `${file.sizeOfFileInKb} KB`}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 text-right text-xs text-gray-400">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
