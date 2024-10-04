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

export default class SearchController extends Controller {
  static targets = ["form", "input", "results"]

  resetOnOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.reset()
    }
  }

  reset() {
    this.resultsTarget.classList.add("hidden")
    this.resultsTarget.innerText = ""
    this.inputTarget.value = ""
  }

  basicSubmit() {
    if (this.inputTarget.value === "") {
      this.reset()
    } else {
      this.formTarget.requestSubmit()
    }
  }

  submit = debounce(this.basicSubmit.bind(this))
}

function debounce(functionToDebounce, wait = 300) {
  let timeoutId = undefined
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      timeoutId = undefined
      functionToDebounce(...args)
    }, wait)
  }
}
