Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root 'events#index'
  put 'events', to: 'events#update'
  post 'events', to: 'events#create'
  get 'events', to: 'events#new'
  get '/festivals', to: 'events#festivals'
  get '/tours', to: 'events#tours'
  get '/:id', to: 'events#show'

end
