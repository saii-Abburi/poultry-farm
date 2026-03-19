import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedData = JSON.parse(userInfo);
      if (parsedData.token) {
        config.headers.Authorization = `Bearer ${parsedData.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
