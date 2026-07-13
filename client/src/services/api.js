import axios from "axios";
import { API_BASE_URL } from "../constants";

/**
 * Axios instance with base URL pre-configured.
 * All API calls should use this instance for consistency.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
