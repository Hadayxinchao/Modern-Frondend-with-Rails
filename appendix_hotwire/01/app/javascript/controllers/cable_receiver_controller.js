/***
 * Excerpted from "Modern Front-End Development for Rails, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit https://pragprog.com/titles/nrclient2 for more book information.
***/
import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class CableReceiverController extends Controller {
  static values = { channelName: String, concertId: Number }
  static targets = ["form"]

  connect() {
    if (this.channel) {
      return
    }
    this.channel = this.createChannel(this)
  }

  createChannel(source) {
    return createConsumer().subscriptions.create(
      { channel: "ConcertChannel", concertId: this.concertIdValue },
      {
        received(data) {
          source.seatUpdated(data)
        },
      }
    )
  }

  seatUpdated(data) {
    const seatElement = document.getElementById(data.seat)
    if (!seatElement || seatElement.dataset.status !== data.status) {
      this.formTarget.requestSubmit()
    }
  }
}
