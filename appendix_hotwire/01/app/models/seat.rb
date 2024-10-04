#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
class Seat
  include ActiveModel::Model
  include ActiveModel::Conversion
  attr_accessor :ticket, :row

  STATUSES = %w[unsold unavailable held purchase refunded invalid]

  delegate :number, :unavailable?, to: :ticket

  def status(user)
    return "invalid" if !row.seat_available?(self) && !unavailable?
    return "other" if ticket.user && ticket.user != user
    ticket.status
  end

  def clickable?(user)
    status(user) == "unsold"
  end

  def id
    "#{row.number}_#{number}"
  end

  def row_seat
    "#{row.number}x#{ticket.number}"
  end

  def hover_color_for(user)
    return "hover:bg-blue-100" if status(user) == "unsold"
  end

  def color_for(user)
    case status(user)
    when "unsold" then "bg-white"
    when "invalid" then "bg-yellow-500"
    when "other" then "bg-red-600"
    when "purchased" then "bg-green-600"
    when "held" then "bg-green-600"
    end
  end
end
