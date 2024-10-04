import * as React from "react"
import CalendarFilter from "./calendar_filter"
import TextFilter from "./text_filter"

export const Filter = (): React.ReactElement => {
  return (
    <section>
      <CalendarFilter />
      <TextFilter />
    </section>
  )
}

export default Filter
