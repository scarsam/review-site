class ReviewsController < ApplicationController
  before_action :set_review, only: [:show]
  before_action :authenticate_author, only: [:start]

  def start
    @author = current_author
  end

  def index
    author = Author.find(params[:author_id])
    @reviews = author.reviews
    render json: @reviews
  end

  def welcome
    @reviews = Review.all
    render json: @reviews
  end

  def create
    @review = current_author.reviews.create(review_params)
    render json: @review, status: 201
  end

  def show
    render json: @review
  end

  private

  def set_review
    @review = Review.find(params[:id])
  end

  def review_params
    params.permit(:title, :description, :rating)
  end
end