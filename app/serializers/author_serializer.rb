class AuthorSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image, :uid
  has_many :reviews
end
