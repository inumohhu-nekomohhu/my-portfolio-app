class Api::V1::PantryItemsController < ApplicationController
  # APIモードではCSRF保護は通常不要（必要ならskip_before_action :verify_authenticity_token）
  before_action :authenticate_user!

  def index
    Rails.logger.info("index確認")
    pantry_items = current_user.pantry_items
    render json: pantry_items, each_serializer: PantryItemSerializer, status: :ok
  end

  def create
    pantry_item = current_user.pantry_items.new(pantry_item_params)
    if params[:item_image]
      pantry_item.item_image.attach(params[:item_image])
    end

    if pantry_item.save
      render json: pantry_item, status: :created
    else
      render json: pantry_item.errors, status: :unprocessable_entity
    end
  end

  def update
    pantry_item = current_user.pantry_items.find_by(id: params[:id])
    if pantry_item.nil?
      render json: { error: "対象の在庫アイテムが見つかりません" }, status: :not_found and return
    end

    if pantry_item.update(pantry_item_params)
      render json: pantry_item, status: :ok
    else
      render json: { errors: pantry_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    pantry_item = current_user.pantry_items.find_by(id: params[:id])
    return render json: { error: "Not found" }, status: :not_found unless pantry_item

    if pantry_item.destroy
      head :no_content
    else
      render json: { errors: pantry_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def pantry_item_params
    params.require(:pantry_item).permit(:name, :quantity, :min_quantity, :category, :expiration_date, :memo)
  end

  # 修正版のJWT認証処理(ALBが勝手にヘッダーを消すようなので、追加対応)
  def authenticate_user!
    # Authorization が届かない場合を想定し、X-Access-Token も見る
    auth_header = request.headers['Authorization'] || request.headers['X-Access-Token']
    Rails.logger.info("Authorizationヘッダー確認: #{auth_header}")

    unless auth_header&.start_with?('Bearer ')
      Rails.logger.info("認証ヘッダーが不正または存在しません")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    token = auth_header.split(' ').last
    begin
      payload = JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' }).first
      Rails.logger.info("JWTデコード成功: #{payload.inspect}")
      @current_user = User.find(payload["user_id"])
    rescue => e
      Rails.logger.info("JWT認証失敗: #{e.message}")
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # 旧バージョン（コメントアウト）
  # def authenticate_user!
  #   Rails.logger.info("リクエストメソッド: #{request.request_method}")
  #   Rails.logger.info("全ヘッダー一覧:\n" + request.headers.env.select { |k,v| k.start_with?('HTTP_') }.map { |k,v| "#{k}: #{v}" }.join("\n"))
  #   Rails.logger.info( "受け取ったJWT: #{request.headers["Authorization"]}")
  #   token = request.headers["Authorization"]&.split(" ")&.last
  #   Rails.logger.info( "トークン確認: #{token}")
  #   begin
  #     Rails.logger.info("秘密鍵２: #{Rails.application.credentials.secret_key_base}")
  #     payload = JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' }).first
  #     Rails.logger.info( "ペイロード確認: #{Rails.application.credentials.secret_key_base}")
  #     @current_user = User.find(payload["user_id"])
  #   rescue
  #     Rails.logger.info("エラー2: #{Rails.application.credentials.secret_key_base}")
  #     Rails.logger.info("エラー1")
  #     render json: { error: "Unauthorized" }, status: :unauthorized
  #   end
  # end

  def current_user
    @current_user
  end
end
