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
# Table name: favorites
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  concert_id :bigint           not null
#  user_id    :bigint           not null
#
class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :concert

  after_create_commit -> do
    Turbo::StreamsChannel.broadcast_stream_to(
      user, :favorites,
      content: ApplicationController.render(
        json: {type: "addFavorite", concertId: concert.id}
      )
    )
  end

  after_destroy_commit -> do
    Turbo::StreamsChannel.broadcast_stream_to(
      user, :favorites,
      content: ApplicationController.render(
        json: {type: "removeFavorite", concertId: concert.id}
      )
    )
  end

  def sort_date
    concert.start_time.to_i
  end
end
