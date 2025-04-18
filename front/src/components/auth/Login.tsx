// frontend/src/components/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      localStorage.setItem('jwt', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('ログイン中にエラーが発生しました');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1470549813517-2fa741d25c92?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded shadow-md w-80 z-10 relative">
        <h2 className="text-xl font-bold mb-4 text-center">ログイン</h2>

        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>

        {/* ✅ サインアップリンク追加 */}
        <div className="mt-4 text-center text-sm text-gray-600">
          初めて利用される方は{' '}
          <Link to="/signup" className="text-blue-500 underline hover:text-blue-700">
            こちら
          </Link>
        </div>
      </div>
    </div>
  );
}
