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
    # default_url_options[:host] は controller で定義しているので、それを fallback として取得
    if instance_options[:host].present?
      instance_options[:host]
    else
      Rails.application.credentials.dig(:host) || ENV.fetch("HOST", "localhost:3000")
    end
  end
end
