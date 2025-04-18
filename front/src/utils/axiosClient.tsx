// frontend/src/utils/axiosClient.ts
import axios from 'axios';

// JWTトークンをlocalStorageから取得
const token = localStorage.getItem('jwt');

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
    // トークンが存在すればAuthorizationヘッダーに追加
    'Authorization': token ? `Bearer ${token}` : ''
  }
});

export default apiClient;
