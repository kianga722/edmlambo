class CreateRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :relationships do |t|
      t.integer :artist_id
      t.integer :event_id

      t.timestamps
    end
  end
end
