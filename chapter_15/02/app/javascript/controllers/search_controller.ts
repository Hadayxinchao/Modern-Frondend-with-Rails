import { Controller } from "@hotwired/stimulus"
import "form-request-submit-polyfill"

export default class SearchController extends Controller {
  static targets = ["form", "input", "results"]
  formTarget: HTMLFormElement
  inputTarget: HTMLInputElement
  resultsTarget: HTMLElement

  resetOnOutsideClick(event: Event): void {
    if (!this.element.contains(event.target as HTMLElement)) {
      this.reset()
    }
  }

  reset(): void {
    this.resultsTarget.classList.add("hidden")
    this.resultsTarget.innerText = ""
    this.inputTarget.value = ""
  }

  basicSubmit(): void {
    if (this.inputTarget.value === "") {
      this.reset()
    } else {
      this.formTarget.requestSubmit()
    }
  }

  submit = debounce(this.basicSubmit.bind(this))
}

type Debounceable = (...args: any[]) => void

function debounce<T extends Debounceable>(
  functionToDebounce: T,
  wait = 300
): T {
  let timeoutId: number | undefined = undefined

  return ((...args) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      timeoutId = undefined
      functionToDebounce(...args)
    }, wait)
  }) as T
}
