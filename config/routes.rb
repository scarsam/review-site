Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'reviews#index'
  get '/auth/google_oauth2/callback' => 'sessions#create'

end
