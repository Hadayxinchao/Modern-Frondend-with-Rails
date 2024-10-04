import * as React from "react"
import Row from "./row"
import { useAppSelector } from "../../contexts/venue_context"

const rowItems = (rowCount: number) => {
  const rowNumbers = Array.from(Array(rowCount).keys())
  return rowNumbers.map((rowNumber) => (
    <Row key={rowNumber + 1} rowNumber={rowNumber + 1} />
  ))
}

export const VenueBody = (): React.ReactElement => {
  const rowCount = useAppSelector((state) => state.rowCount)
  return (
    <table className="table">
      <tbody>{rowItems(rowCount)}</tbody>
    </table>
  )
}

export default VenueBody
