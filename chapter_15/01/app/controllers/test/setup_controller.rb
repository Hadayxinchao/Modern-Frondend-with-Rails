#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
module Test
  class SetupController < ApplicationController
    before_action :require_test_environment

    def log_in_user
      sign_in(:user, User.find_by(email: "areader@example.com"))
    end

    def add_favorite
      concert = Concert.find_by(name: "Brandi Carlile In Concert")
      Favorite.create!(user: current_user, concert: concert)
    end

    private def require_test_environment
      redirect_to(root_path) unless Rails.env.test?
    end
  end
end
