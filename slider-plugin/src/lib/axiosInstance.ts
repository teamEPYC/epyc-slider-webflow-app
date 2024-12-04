import axios from "axios";

export const baseURL = "https://epyc-slider-worker.aayushman.workers.dev";
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
