class SessionsController < ApplicationController
  def create
    @author = Author.find_or_create_by(uid: auth['uid']) do |u|
      u.name = auth[:info][:name]
      u.email = auth[:info][:email]
      u.image = auth[:info][:image]
    end
    session[:user_id] = @author.id
    redirect_to home_path
  end

  def destroy
    session.destroy
    redirect_to root_path
  end

  private
  def auth
    request.env['omniauth.auth']
  end
end