import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // JWT削除
    localStorage.removeItem('jwt');

    // 任意：その他のユーザー情報も削除したい場合はここに追加

    // ログイン画面へ遷移
    navigate('/login');
  }, [navigate]);

  return <p>ログアウト中です...</p>;
};

export default Logout;
