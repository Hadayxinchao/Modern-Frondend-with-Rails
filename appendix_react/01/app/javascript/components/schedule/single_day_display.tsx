import * as React from "react"
import { ScheduleDay } from "../../contexts/schedule_context"
import ConcertDisplay from "./concert_display"

export interface SingleDayDisplayProps {
  day: ScheduleDay
}

export const SingleDayDisplay = ({
  day,
}: SingleDayDisplayProps): React.ReactElement => {
  return (
    <section>
      <div className="text-3xl font-bold">
        {day.day.weekday}, {day.day.month} {day.day.date}, {day.day.year}
      </div>
      <section>
        {day.concerts.map((concert) => (
          <ConcertDisplay key={concert.id} concert={concert} />
        ))}
      </section>
    </section>
  )
}

export default SingleDayDisplay
