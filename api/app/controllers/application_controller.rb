# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
    private
    def authenticate_user!
      auth_header = request.headers['Authorization']
      # Authorizationヘッダが無ければ401を返す
      unless auth_header&.start_with?('Bearer ')
        return render json: { error: 'Unauthorized' }, status: :unauthorized
      end
  
      # "Bearer <token>"からトークン部分を抽出
      token = auth_header.split(' ')[1]
      secret_key = Rails.application.credentials.secret_key_base  # JWT署名に使ったキー
  
      begin
        # トークンをデコードしてペイロード取得（HS256アルゴリズムを想定）
        payload, _ = JWT.decode(token, secret_key, true, { algorithm: 'HS256' })
        # ペイロードからユーザーIDを取り出し、現在のユーザーとして設定
        @current_user = User.find(payload["user_id"])
      rescue ActiveRecord::RecordNotFound, JWT::DecodeError, JWT::ExpiredSignature
        # トークン不正・ユーザー不存在・期限切れ等の場合は401エラー
        return render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  
    # 認証済みユーザーを取得するヘルパー（必要に応じて）
    def current_user
      @current_user
    end
  end
  