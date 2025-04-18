class AddMinQuantityToPantryItems < ActiveRecord::Migration[7.0]
  def change
    add_column :pantry_items, :min_quantity, :integer
  end
end
