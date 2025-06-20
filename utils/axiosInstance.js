import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
