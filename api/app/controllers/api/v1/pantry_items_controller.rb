class Api::V1::PantryItemsController < ApplicationController
  before_action :authenticate_user!

  def index
    pantry_items = @current_user.pantry_items.with_attached_item_image
    render json: pantry_items, host: request.base_url
  end

  def create
    pantry_item = current_user.pantry_items.new(pantry_item_params)

    if params[:item_image]
      # Rails 7.1 未満では public: true を使えないため、通常の attach を使用
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

  def authenticate_user!
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

  def current_user
    @current_user
  end
end
