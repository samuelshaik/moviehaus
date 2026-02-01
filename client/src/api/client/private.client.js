/*import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:5002/api/v1";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

privateClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("actkn")}`
    }
  };
});

privateClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default privateClient*//*
import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:5002/api/v1";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

privateClient.interceptors.request.use(async config => {
  // Try both token keys (actkn and token)
  const token = localStorage.getItem("actkn") || localStorage.getItem("token");
  
  console.log("Token found:", token ? "Yes" : "No");
  
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
  console.log("API Error:", err.response?.data || err);
  throw err.response.data;
});

export default privateClient;*/import axios from "axios";

const baseURL = "http://localhost:5002/api/v1";

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