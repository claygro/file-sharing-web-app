import { createContext } from "react";
import connection from "../config/connection.config";

async function retriveFileData() {
  try {
    await connection.get("/retrive/file");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error retrieving file: ${error}`);
    } else {
      console.log(`Error retrieving file: ${error}`);
    }
  }
}
const fileRetriveContex = createContext(retriveFileData);
export default fileRetriveContex;
