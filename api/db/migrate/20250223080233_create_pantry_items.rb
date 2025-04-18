class CreatePantryItems < ActiveRecord::Migration[7.0]
  def change
    create_table :pantry_items do |t|
      t.string :name
      t.integer :quantity
      t.date :expiration_date
      t.string :category
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
