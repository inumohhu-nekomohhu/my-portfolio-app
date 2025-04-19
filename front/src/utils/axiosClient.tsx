// frontend/src/utils/axiosClient.ts
import axios from 'axios';

// JWTトークンをlocalStorageから取得
const token = localStorage.getItem('jwt');

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // 本番環境のURLに変更
  headers: {
    'Content-Type': 'multipart/form-data',
    // トークンが存在すればAuthorizationヘッダーに追加
    'Authorization': token ? `Bearer ${token}` : ''
  }
});

export default apiClient;
