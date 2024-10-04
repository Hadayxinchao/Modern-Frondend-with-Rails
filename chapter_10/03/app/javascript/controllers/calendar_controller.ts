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
      const schedule = document.getElementById(target.dataset.scheduleId)
      schedule.classList.toggle("hidden", !show)
    })
  }

  showAll(): void {
    this.calendarDayTargets.forEach((target: HTMLElement) => {
      target.dataset.cssStatusValue = "false"
      const schedule = document.getElementById(target.dataset.scheduleId)
      schedule.classList.toggle("hidden", false)
    })
  }
}
