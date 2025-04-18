class ChangeQuantityAndMinQuantityTypeInPantryItems < ActiveRecord::Migration[7.0]
  def change
        # quantityカラムをdecimal型に変更
        change_column :pantry_items, :quantity, :decimal, precision: 10, scale: 2
        # min_quantityカラムをdecimal型に変更
        change_column :pantry_items, :min_quantity, :decimal, precision: 10, scale: 2
  end
end
