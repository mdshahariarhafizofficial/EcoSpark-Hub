import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Return structured data if available, otherwise fallback to the error object
    return Promise.reject(error.response?.data || error);
  }
);
