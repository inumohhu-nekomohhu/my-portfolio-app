Rails.application.routes.draw do
  # API用のルーティング
  namespace :api do
    namespace :v1 do
      resource :session, only: [:create, :destroy]
      # ユーザー登録用（Deviseのコントローラーを使うか、カスタム実装も可能）
      resources :users, only: [:create]
      resources :pantry_items, only: [:create, :update, :index, :show, :destroy]
      resources :recipes, only: [:index]
    end
  end

  # フロントエンドのルートはReact側で管理
end
