import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://161.97.80.240:8086/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

//  Automatically add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
const token = user?.token;


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


//  Handle token errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/'; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
