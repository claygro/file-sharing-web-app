import axios from "axios";
const connection = axios.create({
  baseURL: import.meta.env.VITE_SERVER_SIDE_CONNECTION_URL_signup,
  withCredentials: true,
});
export default connection;
