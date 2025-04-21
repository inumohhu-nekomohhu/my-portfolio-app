# app/serializers/pantry_item_serializer.rb
class PantryItemSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :category, :expiration_date, :min_quantity, :quantity, :memo, :updated_at, :photo_url

  def photo_url
    if object.item_image.attached?
      variant = object.item_image.variant(resize_to_fill: [300, 300]).processed
      rails_blob_url(variant, host: host)
    else
      nil
    end
  end

  private

  def host
    # 優先：インスタンスオプション → 環境変数 → デフォルト
    instance_options[:host].presence || ENV.fetch("HOST", "https://api.linuxstudy5678.com")
  end
end
