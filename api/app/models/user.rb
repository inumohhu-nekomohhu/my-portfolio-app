class User < ApplicationRecord
  has_secure_password
  has_many :pantry_items, dependent: :destroy
  #devise :database_authenticatable, :registerable,
  #       :recoverable, :rememberable, :validatable

validates :password, presence: true, length: { minimum: 6 }
validates :email, presence: true, uniqueness: true
end
