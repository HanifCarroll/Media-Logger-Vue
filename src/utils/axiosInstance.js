import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://brahs.media/api',
  // baseURL: 'http://localhost:3000/api',
  headers: { auth: localStorage.getItem('auth-token') },
});

axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    const Router = require('../router').default;
    if (error.response.status === 401 && Router.currentRoute.path !== '/login') {
      Router.push('/login');
    }
  },
);

export default axiosInstance;
