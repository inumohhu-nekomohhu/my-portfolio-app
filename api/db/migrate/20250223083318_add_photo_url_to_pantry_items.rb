class AddPhotoUrlToPantryItems < ActiveRecord::Migration[7.0]
  def change
    add_column :pantry_items, :photo_url, :string
  end
end
