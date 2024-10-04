import * as React from "react"
import {
  ScheduleDay,
  useAppDispatch,
} from "../../contexts/schedule_context"

export interface SingleDayProps {
  day: ScheduleDay
}

export const SingleDayFilter = ({
  day,
}: SingleDayProps): React.ReactElement => {
  const dispatch = useAppDispatch()

  const calendarClick = (): void => {
    dispatch({ type: "calendarToggle", day: day.id })
  }

  const cssClasses = (): string => {
    return `text-center border-b-2 border-transparent ${
      day.filtered === "yes" ? "border-red-700" : ""
    }`
  }

  return (
    <div className={cssClasses()} onClick={calendarClick}>
      {day.day.month} {day.day.date}
    </div>
  )
}

export default SingleDayFilter
