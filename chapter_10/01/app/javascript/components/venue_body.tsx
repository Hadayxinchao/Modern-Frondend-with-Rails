import * as React from "react"
import Row from "./row"
import { VenueData } from "./venue"
import { Subscription } from "@rails/actioncable"

interface VenueBodyProps {
  concertId: number
  rowCount: number
  seatsPerRow: number
  subscription: Subscription
  ticketsToBuyCount: number
  venueData: VenueData
}

const rowItems = ({
  concertId,
  rowCount,
  seatsPerRow,
  subscription,
  ticketsToBuyCount,
  venueData,
}) => {
  const rowNumbers = Array.from(Array(rowCount).keys())
  return rowNumbers.map((rowNumber: number) => (
    <Row
      concertId={concertId}
      key={rowNumber}
      rowData={venueData[rowNumber]}
      rowNumber={rowNumber}
      seatsPerRow={seatsPerRow}
      subscription={subscription}
      ticketsToBuyCount={ticketsToBuyCount}
    />
  ))
}

export const VenueBody = (props: VenueBodyProps): React.ReactElement => {
  return (
    <table className="table">
      <tbody>{rowItems(props)}</tbody>
    </table>
  )
}

export default VenueBody
