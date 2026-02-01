
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.TMDB_BASE_URL, // https://api.themoviedb.org/3
  headers: {
    "Content-Type": "application/json"
  },
  params: {
    api_key: process.env.TMDB_API_KEY
  },
  timeout: 15000
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
