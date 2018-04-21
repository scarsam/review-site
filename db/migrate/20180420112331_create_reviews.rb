class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :description
      t.integer :rating
      t.references :author
      t.timestamps
    end
  end
end
