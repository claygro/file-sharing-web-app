import { useEffect, useState } from "react";
import connection from "../config/connection.config";

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
        <h2>home</h2>
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
