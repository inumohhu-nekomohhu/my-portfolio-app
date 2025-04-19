# app/controllers/api/v1/sessions_controller.rb
class Api::V1::SessionsController < ApplicationController
    def create
      user = User.find_by(email: params[:email])
  
      # `has_secure_password` による認証処理
      if user&.authenticate(params[:password])
        token = generate_jwt(user)
  
        render json: {
          token: token,
          user: ActiveModelSerializers::SerializableResource.new(user)
        }, status: :ok
      else
        render json: {
          error: 'メールアドレスまたはパスワードが正しくありません'
        }, status: :unauthorized
      end
    end
  
    def destroy
      # JWTを用いた認証では、ログアウト処理はクライアント側でトークンを破棄する
      render json: { message: 'ログアウトしました' }, status: :ok
    end
  
    private
  
    def generate_jwt(user)
      exp = 4.hours.from_now.to_i
      payload = { user_id: user.id, exp: exp }
      logger.debug "秘密１: #{Rails.application.credentials.secret_key_base}"
      JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
    end
  end
  