import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/axiosClient';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('パスワードと再確認パスワードの値が一致しません。もう一度入力してください');
      return;
    }

    try {
        await apiClient.post('/api/v1/users', {
          user: {
            email,
            password
          }
        });
      setSuccessMessage('ユーザー登録が完了しました！ ログインしてください。');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
     console.error('登録エラー:', err);
      setError('登録に失敗しました。時間をおいてもう一度お試しください');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">新規会員登録</h2>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">{error}</div>}
        {successMessage && <div className="mb-4 p-2 bg-blue-100 text-blue-700 border border-blue-300 rounded">{successMessage}</div>}

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
        <input
          type="password"
          placeholder="パスワード（再確認）"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700">
          登録する
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
