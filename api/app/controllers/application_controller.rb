class ApplicationController < ActionController::API
  private

  def authenticate_user!
    auth_header = request.headers['Authorization'] || request.headers['X-Access-Token']
    Rails.logger.info("確認_Authorization header: #{auth_header}")

    unless auth_header&.start_with?('Bearer ')
      Rails.logger.info("認証ヘッダーが不正または存在しません")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    token = auth_header.split(' ')[1]
    secret_key = Rails.application.credentials.secret_key_base

    begin
      payload, _ = JWT.decode(token, secret_key, true, { algorithm: 'HS256' })
      Rails.logger.info("JWT decode 成功: #{payload.inspect}")
      @current_user = User.find(payload["user_id"])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError, JWT::ExpiredSignature => e
      Rails.logger.info( "JWT認証失敗: #{e.message}")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
