import { useEffect, useState } from "react";
import connection from "../config/connection.config";

import { RefreshCcw } from "lucide-react";

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

  const handleRefresh = () => {
    retriveFileData();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-semibold text-gray-900">My Files</h1>
            <button
              onClick={handleRefresh}
              className="bg-gray-200 p-2 rounded-xl cursor-pointer hover:bg-gray-100 active:bg-gray-50"
            >
              <RefreshCcw size={16} />
            </button>
          </div>
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
                {fileData
                  ?.slice()
                  .reverse()
                  ?.map((file) => (
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
