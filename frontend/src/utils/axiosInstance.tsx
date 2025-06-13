// // src/utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://ninebyfourapi.herokuapp.com/api", // Your backend base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Optional: Add a response interceptor to handle 401/403 errors globally
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response &&
//       (error.response.status === 401 || error.response.status === 403)
//     ) {
//       // Token expired or invalid. Perform logout actions.
//       localStorage.removeItem("token");
//       // Dispatch Redux logout action if you have one
//       // store.dispatch(logout()); // You'd need to import your store here
//       // Redirect to login page
//       // window.location.href = '/login'; // Or use react-router-dom's navigate
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


//***********************New Code***********************


// frontend/src/utils/axiosInstance.tsx
import axios, { isAxiosError } from 'axios'; // Import isAxiosError from axios

const axiosInstance = axios.create({
  // The base URL for all your API requests
  // This should match the common prefix of your backend routes (e.g., /api)
  baseURL: 'http://localhost:3010/api', // All backend routes start with /api, so append it here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for token for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Re-export isAxiosError through axiosInstance if you prefer, or just import axios in components
// (example in UserProfile.tsx already imports it directly from 'axios')
export { isAxiosError }; // Exporting for convenience if needed by other files

export default axiosInstance;
