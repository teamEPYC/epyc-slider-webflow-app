import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://epyc-slider-worker.aayushman.workers.dev`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
