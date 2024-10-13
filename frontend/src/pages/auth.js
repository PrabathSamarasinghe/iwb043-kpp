// axiosInstance.js
import axios from 'axios';

let token = localStorage.getItem('authToken');
if (token) {
    console.log('Token found:', token);
    // Proceed with your logic (e.g., making a request)
  } else {
    console.error('No token found in local storage.');
    // Handle the absence of the token (e.g., redirect to login, show a message, etc.)
  }
const axiosInstance = axios.create({
  baseURL: 'http://localhost:9090', // Set your API base URL here
  headers: {Authorization: token}
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = token;
    } else {
      delete config.headers['Authorization']; // Remove the header if no token
    }

    return config; // Return the modified config
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;