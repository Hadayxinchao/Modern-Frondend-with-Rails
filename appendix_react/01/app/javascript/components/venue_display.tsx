import * as React from "react"
import { createRoot } from "react-dom/client"
import App from "./concerts/app"
import ScheduleApp from "./schedule/schedule_app"

document.addEventListener("turbo:load", () => {
  const container = document.getElementById("react-element")
  if (container) {
    const root = createRoot(container)
    root.render(
      <App
        rowCount={parseInt(container.dataset.rowCount || "0", 10)}
        seatsPerRow={parseInt(container.dataset.seatsPerRow || "0", 10)}
        concertId={parseInt(container.dataset.concertId || "0", 10)}
      />
    )
  }

  const schedule_element = document.getElementById("schedule-react-element")
  if (schedule_element) {
    const root = createRoot(schedule_element)
    root.render(
      <ScheduleApp
        favoriteChannelName={schedule_element.dataset.favoriteChannelName}
      />
    )
  }
})
