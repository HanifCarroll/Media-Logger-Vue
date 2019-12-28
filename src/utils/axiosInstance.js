import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://brahs.media/api',
  // baseURL: 'http://localhost:3000',
  headers: { Authorization: `Bearer ${localStorage.getItem('auth-token')}` },
});

axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      const Router = require('../router').default;
      Router.push('/login');
    }
  },
);

export default axiosInstance;
