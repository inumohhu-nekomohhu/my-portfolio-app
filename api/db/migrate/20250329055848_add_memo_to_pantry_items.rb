class AddMemoToPantryItems < ActiveRecord::Migration[7.0]
  def change
    add_column :pantry_items, :memo, :string
  end
end
