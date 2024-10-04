#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
class ScheduleDay
  include ActiveModel::Model
  attr_accessor :day, :concerts, :hidden

  def initialize(day, concerts, hidden = false)
    @day = day
    @concerts = concerts
    @hidden = hidden
  end

  def day_string
    day.by_example("2006-01-02")
  end

  def day_of?(string)
    return false unless string
    day == Date.parse(string)
  end

  def hide!
    @hidden = true
  end

  def toggle!
    @hidden = !@hidden
  end

  def day_to_h
    {
      month: day.by_example("Jan"),
      date: day.by_example("02"),
      year: day.by_example("2006"),
      weekday: day.by_example("Monday"),
      key: day.by_example("2006-01-02")
    }
  end

  def to_h
    {
      id: day.by_example("2006-01-02"),
      day: day_to_h,
      concerts: concerts.sort_by(&:start_time).map(&:to_h)
    }
  end
end
