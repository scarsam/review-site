class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating
  belongs_to :author
end
