import React from 'react';
import Header from '../common/Header';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center px-6 py-10 relative flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470549813517-2fa741d25c92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')",
        }}
      >
        {/* 背景の黒フィルター */}
        <div className="absolute inset-0 bg-black opacity-40 z-0" />

        {/* カード全体 */}
        <div className="relative z-10 max-w-4xl w-full bg-white bg-opacity-90 p-8 rounded-lg shadow-lg animate-fadeIn">

          {/* 🦊 フェネックをカード上部中央に表示 */}
          <img
            src="/animal_fennec.png"
            alt="フェネック"
            className="w-36 h-36 absolute -top-28 right-16 animate-wiggle z-20"
          />

          <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
            Smart Pantry Manager へようこそ
          </h1>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            このアプリは、家庭の食材在庫を管理し、使い切るためのレシピを提案することを目的とした、ポートフォリオ用の開発中アプリケーションです。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded shadow p-4 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-green-700">現在実装されている主な機能</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>JWTによるログイン・ログアウト・サインアップ機能</li>
                <li>食材の在庫登録・編集・削除（画像対応）</li>
                <li>楽天レシピAPIと連携したレシピ検索機能</li>
              </ul>
            </div>
            <div className="bg-white rounded shadow p-4 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-green-700">今後実装予定の機能</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>賞味期限間近の食材通知</li>
                <li>レシピのお気に入り登録・シェア機能</li>
                <li>複数ユーザーでの在庫共有</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-red-600 text-center">
            ※ 本アプリは開発途中のポートフォリオ作品です。
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
