class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.string :date
      t.string :venue
      t.string :location
      t.string :state
      t.string :ages

      t.timestamps
    end
  end
end
