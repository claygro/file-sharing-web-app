import { useEffect, useState } from "react";
import connection from "../config/connection.config";
import demoImage from "../assets/images.jpeg";
import { Search } from "lucide-react";
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
      if (error instanceof Error) {
        console.log(`Error in retriveing the file ${error}`);
      } else {
        console.log(`Error in retriveing the file ${error}`);
      }
    }
  }
  useEffect(() => {
    retriveFileData();
  }, []);
  console.log(fileData);

  return (
    <>
      <div>
        <div className="w-full bg-white shadow-sm px-4 md:px-8 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="flex-1 mr-4">
              <div className="relative w-full">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search in files"
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={demoImage}
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover border border-gray-200 hover:shadow-md transition"
              />
            </div>
          </div>
        </div>
        <h2>Welcome to File</h2>
        {fileData?.map((fileItem, index) => (
          <div key={index}>
            <h1>{fileItem.title}</h1>
            <h1>{fileItem.sizeOfFileInKb}</h1>
            <h1>{fileItem.sizeOfFileInMb}</h1>
            <h1>{fileItem.createdAt}</h1>
            <h1>{fileItem.fileType}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
