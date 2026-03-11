import { createContext, useState, useEffect } from "react";
import connection from "../config/connection.config";
export const FileContext = createContext<any | null>(null);
export const FileRetriveProvider = ({ children }: any) => {
  interface FileDataType {
    _id: string;
    sizeOfFileInKb: number;
    sizeOfFileInMb: number;
    name: string;
    createdAt: string;
    fileType: string;
    fileId: string;
  }
  const [fileData, setFileData] = useState<FileDataType | null>(null);
  async function retriveFileData() {
    try {
      const fileResponse = await connection.get("/retrive/file");
      setFileData(fileResponse.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error retrieving file: ${error}`);
      } else {
        console.log(`Error retrieving file: ${error}`);
      }
    }
  }
  useEffect(() => {
    retriveFileData();
  }, []);
  return (
    <FileContext.Provider value={{ fileData, retriveFileData }}>
      {children}
    </FileContext.Provider>
  );
};
