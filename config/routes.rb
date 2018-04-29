Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#welcome'
  get '/home' => 'home#home'
  get '/auth/google_oauth2/callback' => 'sessions#create'
  get '/sessions/logout' => 'sessions#destroy'
  resources :reviews, only: [:index, :create]
  resources :authors, shallow: true do
    resources :reviews, only: [:index, :show, :create]
  end
end
