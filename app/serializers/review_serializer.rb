class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating, :created_at
  belongs_to :author
end
