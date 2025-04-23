// front/src/pages/ProfilePage.tsx
import React from "react";
import Header from "../components/common/Header";
import { FaBookOpen, FaLaptopCode, FaTools } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 px-6 py-12 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8 border border-green-200">
          <h1 className="text-4xl font-extrabold text-center text-green-700">自己紹介</h1>
          <p className="text-lg text-gray-800 leading-relaxed">
            はじめまして、河村由也と申します。
            金融・製造業の業務システム開発・保守を経験してきました。COBOLやVBAを用いたレガシーな開発から、現在はReactやRailsを用いたモダンな開発へとステップアップし、インフラを含めたフルスタックスキルの習得に励んでいます。
          </p>

          <section>
            <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
              <FaTools /> 実務経験のあるスキル
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li><strong>言語:</strong> COBOL, JCL, VBA, Java</li>
              <li><strong>DB:</strong> Oracle, PostgreSQL</li>
              <li><strong>業務:</strong> RPA開発, バッチ開発・保守・運用</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <FaBookOpen /> 自己研鑽によるスキル
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li><strong>言語:</strong> Ruby, JavaScript / TypeScript</li>
              <li><strong>フレームワーク:</strong> React, Ruby on Rails</li>
              <li><strong>その他:</strong> Git, Docker, JWT, ActiveStorage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
              <FaLaptopCode /> ポートフォリオアプリ（Smart Pantry Manager）
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>JWT認証によるユーザー管理（ログイン・登録）</li>
              <li>食材の在庫管理（画像付き）とCRUD操作</li>
              <li>楽天レシピAPIと連携したレシピ検索</li>
              <li>AWS S3 + CloudFront による画像保存と公開</li>
              <li>Dockerによる開発・本番環境構築</li>
            </ul>
          </section>

          <div className="text-center text-sm text-gray-600 space-y-1">
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/inumohhu-nekomohhu/my-portfolio-app"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/inumohhu-nekomohhu/my-portfolio-app
              </a>
            </p>
            <p>
              アプリURL:{" "}
              <a
                href="https://d3jiipc432qx6a.cloudfront.net/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://d3jiipc432qx6a.cloudfront.net/
              </a>
            </p>
            <p>ゲストログイン: guest01@example.com / guest01</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
