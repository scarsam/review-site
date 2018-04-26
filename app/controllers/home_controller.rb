class HomeController < ApplicationController
  before_action :authenticate_author, only: [:home]
  def home
  end
end