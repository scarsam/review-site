Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'reviews#start'
  get '/welcome' => 'reviews#welcome'
  get '/login' => 'sessions#login'
  get '/auth/google_oauth2/callback' => 'sessions#create'
  get '/sessions/logout' => 'sessions#destroy'
  resources :authors, only: [:create, :destroy] do
    resources :reviews, only: [:index, :show, :create], shallow: true
  end
end