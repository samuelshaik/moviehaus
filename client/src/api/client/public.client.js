import axios from "axios";

const baseURL = "https://moviehaus.onrender.com/api/v1";

const publicClient = axios.create({
  baseURL,
  // Remove the problematic paramsSerializer
});

publicClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json"
    }
  };
});

publicClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  console.error("Public client error:", err);
  throw err.response?.data || err;
});

export default publicClient;