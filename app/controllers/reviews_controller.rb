class ReviewsController < ApplicationController
  before_action :set_review, only: [:show]

  def index
    @reviews = Review.all
    render json: @reviews
  end

  def new
  end

  def create
    @review = current_user.reviews.create(review_params)
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