/*import axios from "axios";
import queryString from "query-string";

const baseURL ="http://localhost:5002/api/v1" ;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
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
  throw err.response.data;
});

export default publicClient;*/import axios from "axios";

const baseURL = "http://localhost:5002/api/v1";

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