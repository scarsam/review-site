class ReviewsController < ApplicationController
  before_action :set_review, only: [:show]
  before_action :authenticate_author, only: [:start]

  # Root path which assigns an @author instance variable for the form
  def start
    @author = current_author
  end

  # Welcome action that gets called once the page is rendered
  def welcome
    @reviews = Review.all
    render json: @reviews
  end

  # Nested resource which renders all the author reviews
  def index
    author = Author.find(params[:author_id])
    @reviews = author.reviews
    render json: @reviews
  end

  # Create action for the form to create an new review
  def create
    @review = current_author.reviews.create(review_params)
    render json: @review, status: 201
  end

  # Render a review
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