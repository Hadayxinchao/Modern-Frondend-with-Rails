/***
 * Excerpted from "Modern Front-End Development for Rails, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit https://pragprog.com/titles/nrclient2 for more book information.
***/
import { Controller } from "@hotwired/stimulus"

export default class CalendarController extends Controller {
  static targets = ["calendarDay"]

  everyDayUnselected() {
    return this.calendarDayTargets.every((target) => {
      return target.dataset.cssStatusValue === "false"
    })
  }

  filter() {
    const everyDayUnselected = this.everyDayUnselected()
    this.calendarDayTargets.forEach((target) => {
      const show =
        everyDayUnselected || target.dataset.cssStatusValue === "true"
      this.toggleAssociatedConcerts(target.dataset.scheduleAttribute, !show)
    })
  }

  showAll() {
    this.calendarDayTargets.forEach((target) => {
      target.dataset.cssStatusValue = "false"
      this.toggleAssociatedConcerts(target.dataset.scheduleAttribute, false)
    })
  }

  toggleAssociatedConcerts(attributeName, toggleValue) {
    if (!attributeName) {
      return
    }
    document
      .querySelectorAll(`.concert[${attributeName}]`)
      .forEach((element) => {
        element.classList.toggle("hidden", toggleValue)
      })
  }
}
