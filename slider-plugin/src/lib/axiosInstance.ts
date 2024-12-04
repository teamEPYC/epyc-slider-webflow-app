import axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
