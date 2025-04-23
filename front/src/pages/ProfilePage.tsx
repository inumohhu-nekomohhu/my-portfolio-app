import React from "react";
import Header from "../components/common/Header";
import { FaBriefcase, FaLightbulb, FaTools, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center justify-start">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">～自己紹介～</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            はじめまして。河村 由也と申します。<br />
            これまで金融系・製造業向けの業務システムの開発や保守に従事してきました。<br />
            COBOLやJCLを用いた大規模会計システムの開発経験、VBAを活用したRPAの構築経験など、レガシーな技術からモダンな開発環境まで、幅広く経験しております。
            <br /><br />
            現在は、AWSを活用したインフラ構築や、ReactとRuby on Railsを組み合わせたフルスタックなアプリ開発にも取り組んでおり、自身の成長と実践力向上を意識して日々学習しています。
          </p>

          {/* 実務経験スキル */}
          <div className="mb-8 p-4 rounded-lg bg-green-100 shadow-sm">
            <h2 className="text-2xl font-semibold flex items-center text-green-800 mb-2">
              <FaBriefcase className="mr-2" /> 実務経験スキル
            </h2>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              <li><strong>言語:</strong> COBOL, JCL, VBA, Java</li>
              <li><strong>ツール:</strong> SVN, Automation Anywhere、Redmine 等</li>
              <li><strong>業務経験:</strong> 会計システムの開発・保守、RPA構築、その他短期案件（鉄道業向けシステム改修 等）</li>
              <li><strong>経験工程:</strong> 詳細設計～単体・結合テストまで経験あり</li>
            </ul>
          </div>

          {/* 自己研鑽スキル */}
          <div className="mb-8 p-4 rounded-lg bg-blue-100 shadow-sm">
            <h2 className="text-2xl font-semibold flex items-center text-blue-800 mb-2">
              <FaLightbulb className="mr-2" /> 自己研鑽スキル
            </h2>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              <li><strong>言語:</strong> Ruby, JavaScript / TypeScript, Java, PHP</li>
              <li><strong>フレームワーク:</strong> React, Ruby on Rails</li>
              <li><strong>インフラ:</strong> Docker, AWS（S3, CloudFront, Elastic Beanstalk）</li>
              <li><strong>その他:</strong> MySQL</li>
            </ul>
          </div>

          {/* ポートフォリオアプリ */}
          <div className="mb-6 p-4 rounded-lg bg-orange-100 shadow-sm">
            <h2 className="text-2xl font-semibold flex items-center text-orange-800 mb-2">
              <FaTools className="mr-2" /> ポートフォリオアプリ
            </h2>
            <p className="text-gray-800 mb-2">
              React + Rails を用いた食材在庫管理アプリを開発中です。以下の機能を実装済みです。
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-1 mb-2">
              <li>JWTによるログイン・サインアップ機能</li>
              <li>食材の在庫登録・編集・削除（画像対応）</li>
              <li>楽天レシピAPIと連携したレシピ検索機能</li>
              <li>AWS S3への画像保存、CloudFrontによる配信</li>
              <li>Docker環境による開発・本番構築</li>
            </ul>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <FaGithub className="inline mr-1" />
                GitHub:
                <a
                  href="https://github.com/inumohhu-nekomohhu/my-portfolio-app"
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/inumohhu-nekomohhu/my-portfolio-app
                </a>
              </p>
              <p>
                <FaExternalLinkAlt className="inline mr-1" />
                公開URL:
                <a
                  href="https://d3jiipc432qx6a.cloudfront.net/"
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.linuxstudy5678.com/
                </a>
              </p>
              <p>ゲストログイン用：guest01@example.com / guest01</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
