import * as React from "react"
import {
  visibleDays,
  useAppSelector,
} from "../../contexts/schedule_context"
import SingleDayDisplay from "./single_day_display"

export const ScheduleDisplay = (): React.ReactElement => {
  const scheduleDays = useAppSelector((state) => visibleDays(state))
  return (
    <section>
      {scheduleDays.map((day, index) => (
        <SingleDayDisplay key={index} day={day} />
      ))}
    </section>
  )
}

export default ScheduleDisplay
