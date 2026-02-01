/*import axios from "axios";

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

export default privateClient;*/import axios from "axios";

const baseURL = "https://moviehaus.onrender.com/api/v1";

const privateClient = axios.create({
  baseURL,
  timeout: 15000
});

// Request interceptor
privateClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("actkn") ||
      localStorage.getItem("token");

    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    };

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
privateClient.interceptors.response.use(
  (response) => {
    return response?.data ?? response;
  },
  (error) => {
    console.error("Private API error:", error.message);

    // Handle expired / invalid token cleanly
    if (error.response?.status === 401) {
      localStorage.removeItem("actkn");
      localStorage.removeItem("token");
    }

    return Promise.reject({
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Authentication or server issue"
    });
  }
);

export default privateClient;