// frontend/src/utils/axiosClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

// 毎回リクエストごとに最新のJWTを取得
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token && config.headers) {
    config.headers['X-Access-Token'] = `Bearer ${token}`; // ここを変更
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
