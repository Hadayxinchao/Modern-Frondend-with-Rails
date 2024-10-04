#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
# == Schema Information
#
# Table name: shopping_carts
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
class ShoppingCart < ApplicationRecord
  belongs_to :user

  def add_tickets(
    concert_id:,
    row:,
    seat_number:,
    tickets_to_buy_count:,
    status:
  )
    seat_range = seat_number...seat_number + tickets_to_buy_count
    tickets = Ticket.where(
      concert_id: concert_id,
      row: row,
      number: seat_range
    )
    tickets.update(status: status, user: user)
  end

  def clear(concert_id:, row:, seat_number:, tickets_to_buy_count:, status:)
    seat_range = seat_number...(seat_number + tickets_to_buy_count)
    tickets = Ticket.where(
      concert_id: concert_id,
      row: row,
      number: seat_range
    )
    tickets.each do |ticket|
      ticket.update(status: :unsold, user: nil)
    end
  end

  def clear_all(concert_id:, user_id:)
    tickets = Ticket.where(concert_id: concert_id, user_id: user_id)
    tickets.each do |ticket|
      ticket.update(status: :unsold, user: nil)
    end
  end
end
