class ReviewsController < ApplicationController
  before_action :set_review, only: [:show]

  def index
    @reviews = Review.all
    render json: @reviews
  end

  def new
  end

  def create
  end

  def show
    render json: @review
  end

  private

  def set_review
    @review = Review.find(params[:id])
  end
end