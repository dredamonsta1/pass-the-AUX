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
import axios from 'axios';

const axiosInstance = axios.create({
  // Set the baseURL to your Dockerized backend's address and port
  // This will prefix all relative requests made with axiosInstance
  // Ensure this matches the backend service's exposed port in docker-compose.yml
  baseURL: 'http://localhost:3010', // Or just 'http://backend:3010' if only connecting within Docker network
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for token for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Ensure the token is correctly added to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
