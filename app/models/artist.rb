class Artist < ApplicationRecord
  has_many :relationships
  has_many :events, :through => :relationships
end
