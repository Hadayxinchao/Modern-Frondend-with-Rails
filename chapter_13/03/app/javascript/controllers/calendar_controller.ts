import { Controller } from "@hotwired/stimulus"

export default class CalendarController extends Controller {
  static targets = ["calendarDay"]
  calendarDayTargets: HTMLElement[]

  everyDayUnselected(): boolean {
    return this.calendarDayTargets.every((target: HTMLElement) => {
      return target.dataset.cssStatusValue === "false"
    })
  }

  filter(): void {
    const everyDayUnselected = this.everyDayUnselected()
    this.calendarDayTargets.forEach((target: HTMLElement) => {
      const show =
        everyDayUnselected || target.dataset.cssStatusValue === "true"
      this.toggleAssociatedConcerts(target.dataset.scheduleAttribute, !show)
    })
  }

  showAll(): void {
    this.calendarDayTargets.forEach((target: HTMLElement) => {
      target.dataset.cssStatusValue = "false"
      this.toggleAssociatedConcerts(target.dataset.scheduleAttribute, false)
    })
  }

  toggleAssociatedConcerts(
    attributeName: string,
    toggleValue: boolean
  ): void {
    document
      .querySelectorAll(`.concert[${attributeName}]`)
      .forEach((element) => {
        element.classList.toggle("hidden", toggleValue)
      })
  }
}
