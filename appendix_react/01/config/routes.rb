#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
Rails.application.routes.draw do
  resources :favorites
  resource :schedule
  resources :shopping_carts
  resources :ticket_orders
  resources :tickets
  resources :gigs
  resources :concerts
  resources :bands
  resources :venues
  resource(:sold_out_concerts, only: :show)
  devise_for :users
  root to: "schedules#show"

  if Rails.env.test?
    namespace :test do
      post("log_in_user", to: "setup#log_in_user")
      post("add_favorite", to: "setup#add_favorite")
    end
  end
end
