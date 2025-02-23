class Api::V1::SessionsController < ApplicationController
#ログイン検証に必要な各種メソッドを設定
    def create
        # ①メールアドレスに基づいてユーザーを検索。
        user = User.find_by(email: params[:email])

        # ②ユーザーが存在し、パスワードが正しいかを検証します。
        # valid_password?は、deviseによって追加されたメソッド
        if user && user.valid_password?(params[:password])
            # ユーザー認証が成功した場合、JWTを生成します。
            token = generate_jwt(user)

            # Active Model Serializers を利用してユーザー情報をシリアライズし、
            # JWTと共にJSONレスポンスとして返します。
            # HTTPステータス200
            # ユーザー情報も一緒に帰すのは、フロントで可能な限り早く使うため
            render json: { token: token, user: ActiveModelSerializers::SerializableResource.new(user) }, status: :ok
        else
            # 認証に失敗した場合、エラーメッセージと共にHTTPステータス401を返します。
            render json: { error: 'メールアドレスまたはパスワードが正しくありません' }, status: :unauthorized
        end
    end

    def destroy
    # JWT認証の場合、サーバー側で状態を持たないため、
    # ログアウトはクライアント側でトークンを破棄するだけ。
    render json: { message: 'ログアウトしました' }, status: :ok
    end

    private

    # ユーザー情報からJWTを生成するためのメソッド
    def generate_jwt(user)
      # 有効期限を4時間後に設定（秒数に変換）
      exp = 4.hours.from_now.to_i
      # JWTのペイロードにはユーザーIDと有効期限を含める。
      # 後でJWTの検証時に、どのユーザーに対応するトークンか、またそのトークンが有効期限内であるかを確認することができます。
      payload = { user_id: user.id, exp: exp }
      # JWT.encodeメソッドを利用して、ペイロードを秘密鍵で署名。
      JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
    end
end
