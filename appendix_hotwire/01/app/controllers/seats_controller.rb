#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
class SeatsController < ApplicationController
  before_action :load_data, only: [:update, :destroy]

  def update
    @cart.add_tickets(
      concert_id: params[:concert_id].to_i,
      row: params[:row_number].to_i,
      seat_number: params[:seat_number].to_i,
      tickets_to_buy_count: params[:tickets_to_buy_count].to_i,
      status: "held"
    )
    load_row
    @concert.broadcast_schedule_change
  end

  def destroy
    @cart.clear(
      concert_id: params[:concert_id],
      row: params[:row_number].to_i,
      seat_number: params[:seat_number].to_i,
      tickets_to_buy_count: params[:tickets_to_buy_count].to_i,
      status: "unsold"
    )
    load_row
    @concert.broadcast_schedule_change
  end

  private def load_data
    @user = current_user
    @cart = ShoppingCart.find_or_create_by(user_id: params[:user_id])
    @concert = Concert.find(params[:concert_id])
  end

  private def load_row
    @row = @concert.row_at(
      tickets: @concert.tickets_in_row(params[:row_number].to_i),
      number: params[:row_number].to_i,
      tickets_to_buy_count: params[:tickets_to_buy_count].to_i
    )
  end
end
