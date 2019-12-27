import axios from 'axios';

const axiosInstance = axios.create({
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
