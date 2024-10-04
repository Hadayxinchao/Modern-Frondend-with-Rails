#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
class SchedulesController < ApplicationController
  def show
    @concerts = Concert.includes(:venue, gigs: :band).all
    @schedule = Schedule.from_concerts(@concerts)
    @schedule.hide(params[:hidden]&.split(",") || [])
    @schedule.schedule_day_at(params[:toggle])&.toggle!
    favorites = current_user&.favorites || []
    respond_to do |format|
      format.html
      format.json do
        render(
          json: {
            scheduleDays: @schedule.days_hash,
            favorites: favorites.map { |f| f.concert.to_h },
            userId: current_user.id
          }
        )
      end
    end
  end
end
