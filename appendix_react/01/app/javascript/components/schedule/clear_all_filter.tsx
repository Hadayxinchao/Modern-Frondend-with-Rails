import * as React from "react"
import { useAppDispatch } from "../../contexts/schedule_context"

export const ClearAllFilter = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const clearAllClick = (): void => {
    dispatch({ type: "clearFilters" })
  }

  return <div onClick={clearAllClick}>Show All</div>
}

export default ClearAllFilter
