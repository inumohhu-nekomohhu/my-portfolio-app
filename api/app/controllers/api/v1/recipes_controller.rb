# app/controllers/api/v1/recipes_controller.rb
class Api::V1::RecipesController < ApplicationController
  before_action :authenticate_user!, only: [:index]  # indexアクションに認証を適用

  def index
    # 認証済みユーザーのみここに到達する
    # 楽天レシピカテゴリAPIを使用してデータ取得
    categories_response = HTTParty.get(
      "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426", 
      query: { applicationId: appid }
    )
    
    rankings_response = HTTParty.get(
      "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426", 
      query: { 
        applicationId: appid, 
        categoryId: match['categoryId'], 
        count: 10 
      }
    )
    # 必要なデータをパース・整形（ActiveModelSerializersを使用している場合はシリアライズ）
    render json: {
      categories: categories_response.parsed_response,
      rankings: rankings_response.parsed_response
    }
  end

  # （他のアクションやプライベートメソッド定義）
end
