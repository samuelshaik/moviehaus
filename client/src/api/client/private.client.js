import axios from "axios";

const baseURL = "https://moviehaus.onrender.com/api/v1";

const privateClient = axios.create({
  baseURL,
  // Remove the problematic paramsSerializer
});

privateClient.interceptors.request.use(async config => {
  const token = localStorage.getItem("actkn") || localStorage.getItem("token");
  
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : undefined
    }
  };
});

privateClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  console.error("Private client error:", err);
  throw err.response?.data || err;
});

export default privateClient;