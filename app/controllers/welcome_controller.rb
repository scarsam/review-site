class WelcomeController < ApplicationController
  def index
    @author = Author.all.last
  end
end
