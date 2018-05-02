class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :logged_in?, :authenticate_author

  private
  def authenticate_author
    redirect_to root_path unless logged_in?
  end

  def logged_in?
    !!current_author
  end

  def current_author
    @current_author ||= Author.find(session[:user_id]) if session[:user_id]
  end
end
