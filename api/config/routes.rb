Rails.application.routes.draw do
  # API用のルーティング
  namespace :api do
    namespace :v1 do
      resource :session, only: [:create, :destroy]
      resources :users, only: [:create]
      resources :pantry_items, only: [:create, :update, :index, :show, :destroy]
      resources :recipes, only: [:index]
    end
  end

  # ALBのヘルスチェック用ルート（200 OK を返す）
  get "/", to: proc { [200, {}, ["ok"]] }

  # フロントエンドのルートはReact側で管理
end
