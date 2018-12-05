Rails.application.routes.draw do
  root 'events#index'
  put 'events', to: 'events#update'
  post 'events', to: 'events#create'

  resources :events, only: [:index]
end
