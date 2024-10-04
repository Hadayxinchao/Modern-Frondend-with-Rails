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

export default class SoldOutDataController extends Controller {
  static targets = ["concert"]

  connect() {
    if (this.subscription) {
      return
    }
    this.started = true
    this.subscription = this.createSubscription(this)
  }

  createSubscription(source) {
    return createConsumer().subscriptions.create("ScheduleChannel", {
      received({ concerts }) {
        source.updateData(concerts)
      },
    })
  }

  updateData(concerts) {
    concerts.forEach(({ concertId, ticketsRemaining }) => {
      this.concertTargets.forEach((e) => {
        if (e.dataset.concertIdValue === concertId.toString()) {
          e.dataset.concertTicketsRemainingValue =
            ticketsRemaining.toString()
          e.dataset.concertSoldOutValue = (
            ticketsRemaining === 0
          ).toString()
        }
      })
    })
  }
}
