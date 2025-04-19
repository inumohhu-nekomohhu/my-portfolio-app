class Api::V1::PantryItemsController < ApplicationController
    # APIモードではCSRF保護は通常不要（必要ならskip_before_action :verify_authenticity_token）
    
    # before_actionでユーザー認証を実施する（JWT認証など）
    before_action :authenticate_user!
  

    
    def index
      Rails.logger.info("index確認")
      pantry_items = current_user.pantry_items
      render json: pantry_items, each_serializer: PantryItemSerializer, status: :ok
    end
    
    def create
      #★POSTで送られてきた情報は、createに入った時点で[params]オブジェクトに格納されている。
      # current_userは認証済みのユーザーが設定されている前提
      pantry_item = current_user.pantry_items.new(pantry_item_params)
  
      # 画像ファイルが送信されていれば、Active Storageに添付
      if params[:item_image]
        pantry_item.item_image.attach(params[:item_image])
      end
  
      if pantry_item.save
        render json: pantry_item, status: :created
      else
        render json: pantry_item.errors, status: :unprocessable_entity
      end
    end
  
    # 編集
    def update
      # current_user の所有するアイテムから、更新対象のレコードを探す
      pantry_item = current_user.pantry_items.find_by(id: params[:id])
      
      
      # レコードが見つからなければ404を返す
      if pantry_item.nil?
        render json: { error: "対象の在庫アイテムが見つかりません" }, status: :not_found and return
      end
  
      # 更新を試みる
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
      # フォームから送られるパラメータ（画像は別で添付するので除外）
      params.require(:pantry_item).permit(:name, :quantity, :min_quantity, :category, :expiration_date, :memo)
    end
  
    # 仮の認証メソッド（JWT認証等、実装に合わせて変更）
    def authenticate_user!
      # 例：JWTトークンからユーザーを取得する処理
      # ここでは current_user をセットする必要がある。
      Rails.logger.info("リクエストメソッド: #{request.request_method}")
      Rails.logger.info("全ヘッダー一覧:\n" + request.headers.env.select { |k,v| k.start_with?('HTTP_') }.map { |k,v| "#{k}: #{v}" }.join("\n"))
      Rails.logger.info( "受け取ったJWT: #{request.headers["Authorization"]}")
      token = request.headers["Authorization"]&.split(" ")&.last
      Rails.logger.info( "トークン確認: #{token}")
      begin
        Rails.logger.infol("秘密鍵２: #{Rails.application.credentials.secret_key_base}")
        payload = JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' }).first
        Rails.logger.info( "ペイロード確認: #{Rails.application.credentials.secret_key_base}")
        @current_user = User.find(payload["user_id"])
      rescue
        ails.logger.infol("エラー2: #{Rails.application.credentials.secret_key_base}")
        Rails.logger.info("エラー1")
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  


    def current_user
      @current_user
    end
  end
  