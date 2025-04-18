# app/serializers/pantry_item_serializer.rb
class PantryItemSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :category, :expiration_date, :min_quantity, :quantity, :memo, :updated_at, :photo_url

  def photo_url
    if object.item_image.attached?
      # 300x300ピクセルにリサイズし、中央トリミングするバリアントを生成
      variant = object.item_image.variant(resize_to_fill: [300, 300]).processed
      rails_blob_url(variant, host: 'http://localhost:3000')
    else
      nil
    end
  end
end
