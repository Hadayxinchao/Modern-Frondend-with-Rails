/***
 * Excerpted from "Modern Front-End Development for Rails, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit https://pragprog.com/titles/nrclient2 for more book information.
***/
import { Controller } from "@hotwired/stimulus"
import "form-request-submit-polyfill"

export default class ClearAllController extends Controller {
  static targets = ["form", "hiddenField"]
  static values = { hiddenId: String }

  submit() {
    const hiddenValueElement = document.getElementById(this.hiddenIdValue)
    if (hiddenValueElement) {
      this.hiddenFieldTarget.value = hiddenValueElement.value
    }
    this.formTarget.requestSubmit()
  }
}
