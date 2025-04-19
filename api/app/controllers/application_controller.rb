class ApplicationController < ActionController::API
  private

  # 修正版の JWT 認証処理
  def authenticate_user!
    auth_header = request.headers['Authorization'] || request.headers['X-Access-Token']
    Rails.logger.info("★Authorizationヘッダーの中身: #{auth_header}")

    unless auth_header&.start_with?('Bearer ')
      Rails.logger.info("★Authorizationヘッダーが 'Bearer' で始まっていません。ヘッダー値: #{auth_header}")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    token = auth_header.split(' ')[1]
    if token.blank?
      Rails.logger.info("★トークン部分が空です。auth_header: #{auth_header}")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    begin
      secret_key = Rails.application.credentials.secret_key_base
      payload, _ = JWT.decode(token, secret_key, true, { algorithm: 'HS256' })
      Rails.logger.info("★JWTデコード成功。ペイロード: #{payload.inspect}")
      @current_user = User.find(payload["user_id"])
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.info("★ユーザーIDが見つかりませんでした: #{e.message}")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    rescue JWT::DecodeError, JWT::ExpiredSignature => e
      Rails.logger.info("★JWTデコード失敗: #{e.message}")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # 旧 authenticate_user!（バックアップ用にコメントアウト）
  # def authenticate_user!
  #   auth_header = request.headers['Authorization'] || request.headers['X-Access-Token']
  #   Rails.logger.info("確認_Authorization header: #{auth_header}")
  #
  #   unless auth_header&.start_with?('Bearer ')
  #     Rails.logger.info("認証ヘッダーが不正または存在しません")
  #     return render json: { error: 'Unauthorized' }, status: :unauthorized
  #   end
  #
  #   token = auth_header.split(' ')[1]
  #   secret_key = Rails.application.credentials.secret_key_base
  #
  #   begin
  #     payload, _ = JWT.decode(token, secret_key, true, { algorithm: 'HS256' })
  #     Rails.logger.info("JWT decode 成功: #{payload.inspect}")
  #     @current_user = User.find(payload["user_id"])
  #   rescue ActiveRecord::RecordNotFound, JWT::DecodeError, JWT::ExpiredSignature => e
  #     Rails.logger.info( "JWT認証失敗: #{e.message}")
  #     return render json: { error: 'Unauthorized' }, status: :unauthorized
  #   end
  # end

  def current_user
    @current_user
  end
end
