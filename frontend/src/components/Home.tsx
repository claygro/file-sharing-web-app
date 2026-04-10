import { useEffect, useState, useContext } from "react";
import connection from "../config/connection.config";
import socket from "../config/socket";
import { RefreshCcw } from "lucide-react";
import FilePreviewPopUp from "./FilePreviewPopUp";
import { FileContext } from "../context/fileRetriveContext";
const Home = () => {
  const [isFileShow, setIsFileShow] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string>("");
  const { fileData, retriveFileData } = useContext(FileContext);
  useEffect(() => {
    retriveFileData();
  }, []);

  const handleRefresh = () => {
    retriveFileData();
  };
  const handleFileClick = async (fileId: string) => {
    setIsFileShow(true);
    try {
      // console.log(fileId);
      await connection.get(`/fileVault/file/${fileId}`);
      setFileId(fileId);
      // console.log(
      //   window.open(`http://localhost:8000/fileVault/file/${fileId}`, "_blank"),
      // );

      // console.log(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error in getting url ${error}`);
      } else {
        console.log(`Error in getting url ${error}`);
      }
    }
  };
  return (
    <div className="h-dvh  bg-gray-50 overflow-y-auto">
      {/* Topbar */}

      {/* Main */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        {/* file show popup */}
        {isFileShow && (
          <div>
            {fileData && fileData.length > 0 && (
              <FilePreviewPopUp
                setIsFileShow={setIsFileShow}
                fileId={fileId}
                file={fileData}
                setFileId={setFileId}
              />
            )}
          </div>
        )}
        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-auto">
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
                  ?.map((file: any) => (
                    <tr
                      key={file._id}
                      className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition"
                      onClick={() => handleFileClick(file.fileId)}
                    >
                      {/* Name */}
                      <td className="py-4 px-5">
                        <p className="font-medium text-gray-900 truncate max-w-[200px]">
                          {file.name}
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
