import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../utils/axiosClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/v1/session', { email, password });
      // ここでresponse.data.tokenにJWTが入っているので、LocalStorageまたはContextに保存
      localStorage.setItem('jwt', response.data.token);
      // 認証状態が更新されたと仮定し、ダッシュボードに遷移
      navigate('/dashboard');
    } catch (error) {
      // AxiosErrorの場合、error.response.data.error にエラーメッセージが入っているはず
      // 発生したエラーがaxios由来（APIで帰されたエラー）かを確認し、正であればjsonにエラーメッセージあり。
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('ログイン中にエラーが発生しました');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">ログイン</h2>
                {/* エラーメッセージがある場合に表示 */}
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
              {errorMessage}
            </div>
          )}
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
          ログイン
        </button>
      </form>
    </div>
  );
}
