class PantryItem < ApplicationRecord
  belongs_to :user

  # Active Storageによる画像添付（単一画像の場合）
  has_one_attached :item_image

  # バリデーション　名前は非空白であり、在庫数は0以上であること
  validates :name, presence: true
  # 数値であり、0以上であることを検証（小数点も許容）
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }
  validates :min_quantity, numericality: { greater_than_or_equal_to: 0 }
end
