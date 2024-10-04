/***
 * Excerpted from "Modern Front-End Development for Rails, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit https://pragprog.com/titles/nrclient2 for more book information.
***/
import { Controller } from "@hotwired/stimulus"

export default class CssFlipController extends Controller {
  static classes = ["on", "off"]
  static targets = ["elementToChange"]
  static values = { status: Boolean }

  toggle() {
    this.flipState()
  }

  flipState() {
    this.statusValue = !this.statusValue
  }

  statusValueChanged() {
    this.updateCssClass()
  }

  updateCssClass() {
    for (const oneCssClass of this.onClasses) {
      this.elementToChangeTarget.classList.toggle(
        oneCssClass,
        this.statusValue
      )
    }

    for (const oneCssClass of this.offClasses) {
      this.elementToChangeTarget.classList.toggle(
        oneCssClass,
        !this.statusValue
      )
    }
  }
}
