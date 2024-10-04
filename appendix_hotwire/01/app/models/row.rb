#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
class Row
  include ActiveModel::Model
  include ActiveModel::Conversion
  attr_accessor :tickets, :number, :seats, :tickets_to_buy_count

  def initialize(tickets:, number:, tickets_to_buy_count: 1)
    @tickets = tickets
    @number = number
    @tickets_to_buy_count = tickets_to_buy_count
    @seats = tickets.map { |ticket| Seat.new(ticket: ticket, row: self) }
  end

  def id
    number
  end

  def seats_in_row
    seats.count
  end

  def seat_available?(seat)
    return false if close_to_edge?(seat)
    return false if close_to_purchased_ticket?(seat)
    true
  end

  def close_to_edge?(seat)
    seat.number + tickets_to_buy_count - 1 > seats_in_row
  end

  def close_to_purchased_ticket?(seat)
    seats.filter do |s|
      s.number.in?(seat.number...(seat.number + tickets_to_buy_count))
    end.any?(&:unavailable?)
  end
end
