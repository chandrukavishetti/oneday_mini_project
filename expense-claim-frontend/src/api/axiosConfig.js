import axios from 'axios';

// Get base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor - Add any request preprocessing here
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add authentication tokens here if needed in future
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle responses and errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // Return only data portion
    },
    (error) => {
        // Handle global errors here
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            
            // Custom error messages based on status
            switch (status) {
                case 400:
                    console.error('Bad Request:', data);
                    break;
                case 404:
                    console.error('Resource not found:', data);
                    break;
                case 409:
                    console.error('Conflict:', data);
                    break;
                case 500:
                    console.error('Server Error:', data);
                    break;
                default:
                    console.error('API Error:', data);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server. Please check your connection.');
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;