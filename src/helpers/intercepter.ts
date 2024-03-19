import axios from 'axios';
import baseURL from './constants';

const api = axios.create({
  baseURL:`${baseURL}lms`
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
