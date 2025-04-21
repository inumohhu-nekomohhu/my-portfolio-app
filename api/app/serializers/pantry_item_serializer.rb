class PantryItemSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :category, :expiration_date,
             :min_quantity, :quantity, :memo, :updated_at, :image_url

  def image_url
    object.image_url
  end

  # photo_url は未使用なら削除してOK（もしくは統合）
  # def photo_url
  #   ...
  # end

  private

  def host
    instance_options[:host].presence || ENV.fetch("HOST", "https://api.linuxstudy5678.com")
  end
end
