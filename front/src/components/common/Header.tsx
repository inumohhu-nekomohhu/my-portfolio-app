// frontend/src/components/common/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');  // JWTトークンを削除
    navigate('/login');              // ログイン画面に遷移
  };

  return (
    <header className="bg-green-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-3xl font-bold">Smart Pantry Manager</Link>
        <nav className="flex items-center space-x-4">
          <Link to="/dashboard" className="hover:underline">ダッシュボード</Link>
          <Link to="/inventory/new" className="hover:underline">在庫の追加</Link>
          <Link to="/inventory" className="hover:underline">在庫一覧</Link>
          <Link to="/recipes/search" className="hover:underline">レシピ検索</Link>
          <button
            onClick={handleLogout}
            className="hover:underline text-white"
          >
            ログアウト
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
