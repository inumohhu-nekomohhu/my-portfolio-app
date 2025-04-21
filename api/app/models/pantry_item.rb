class PantryItem < ApplicationRecord
  belongs_to :user

  # Active Storageによる画像添付（単一画像の場合）
  has_one_attached :item_image

  # バリデーション　名前は非空白であり、在庫数は0以上であること
  validates :name, presence: true
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }
  validates :min_quantity, numericality: { greater_than_or_equal_to: 0 }

  # 添付画像がある場合はS3の恒久URLを返す
  def image_url
    if item_image.attached?
      s3_base_url = ENV.fetch("S3_BASE_URL", "https://my-inventry-images.s3.ap-northeast-1.amazonaws.com")
      "#{s3_base_url}/#{item_image.key}"
    end
  end
end
