Rails.application.routes.draw do
  root 'events#index'
  put 'events', to: 'events#update'

  resources :events, only: [:index]
end
