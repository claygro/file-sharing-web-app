import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import connection from "../config/connection.config";
const SharePagePreview = () => {
  const token = useParams();
  console.log(token.token);

  try {
    //   const data = await connection.get(`/shareUrl/share/${token.token}`);
    window.location.href = `http://localhost:8000/shareUrl/share/${token.token}`;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error in getting the url ${error}`);
    }
    console.log(`Error in getting the url ${error}`);
  }
};

export default SharePagePreview;
