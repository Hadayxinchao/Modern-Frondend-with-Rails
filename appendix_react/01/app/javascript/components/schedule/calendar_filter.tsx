import * as React from "react"
import SingleDayFilter from "./single_day_filter"
import ClearAllFilter from "./clear_all_filter"
import { ScheduleState, ScheduleDay } from "../../contexts/schedule_context"
import { useSelector } from "react-redux"

export const CalendarFilter = (): React.ReactElement => {
  const scheduleDays = useSelector<ScheduleState, ScheduleDay[]>((state) =>
    Object.values(state.scheduleDays).map((scheduleDay) => scheduleDay)
  )

  return (
    <section>
      <div className="grid grid-cols-7 gap-0 mb-6">
        {scheduleDays.map((day, index) => (
          <SingleDayFilter key={index} day={day} />
        ))}
        <ClearAllFilter />
      </div>
    </section>
  )
}

export default CalendarFilter
