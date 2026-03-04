import axios from "axios";
const connection = axios.create({
  baseURL: "https://file-sharing-web-app-backend-orcx.onrender.com",
  withCredentials: true,
});
export default connection;
