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
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  full_name              :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class User < ApplicationRecord
  has_many :favorites, dependent: :destroy
  has_many :concerts, through: :favorites

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  kredis_unique_list :concerts_being_edited, typed: :integer

  def editing?(concert)
    concerts_being_edited.elements.include?(concert.id)
  end

  def start_editing(concert)
    concerts_being_edited.append(concert.id)
  end

  def end_editing(concert)
    concerts_being_edited.remove(concert.id)
  end

  def self.hoarder
    User.find_by(email: "thoarder@example.com")
  end

  def favorite(concert)
    favorites.find_by(concert_id: concert.id)
  end
end
