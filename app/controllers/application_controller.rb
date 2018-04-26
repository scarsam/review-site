class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :logged_in?

  private
  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= Author.find(session[:user_id]) if session[:user_id]
  end
end
