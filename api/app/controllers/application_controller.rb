# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  private

  def authenticate_user!
    auth_header = request.headers['Authorization'] || request.headers['X-Access-Token']
    Rails.logger.info("Authorization header: #{auth_header}") # デバッグ用ログ出力

    unless auth_header&.start_with?('Bearer ')
      Rails.logger.info("1通る") # デバッグ用ログ出力
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    token = auth_header.split(' ')[1]
    secret_key = Rails.application.credentials.secret_key_base

    begin
      payload, _ = JWT.decode(token, secret_key, true, { algorithm: 'HS256' })
      Rails.logger.info("JWT decode 成功。ペイロード: #{payload.inspect}")
      @current_user = User.find(payload["user_id"])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError, JWT::ExpiredSignature => e
      logger.error "Authentication failed: #{e.message}"
      Rails.logger.info("JWT decode 失敗: #{e.message}")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
