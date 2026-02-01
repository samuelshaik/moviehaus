/*import axios from "axios";

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

export default publicClient;*/
import axios from "axios";

const baseURL = "https://moviehaus.onrender.com/api/v1";

const publicClient = axios.create({
  baseURL,
  timeout: 15000 // helps with Render cold start
});

// Request interceptor
publicClient.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json"
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
publicClient.interceptors.response.use(
  (response) => {
    return response?.data ?? response;
  },
  (error) => {
    console.error("Public API error:", error.message);

    return Promise.reject({
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Server is waking up, please try again"
    });
  }
);

export default publicClient;