import * as React from "react"
import Seat from "./seat"
import { IsVenueContext, VenueContext } from "./app"

interface RowProps {
  rowNumber: number
}

const Row = ({ rowNumber }: RowProps): React.ReactElement => {
  const context = React.useContext<IsVenueContext>(VenueContext)

  const seatItems = Array.from(Array(context.state.seatsPerRow).keys()).map(
    (seatNumber) => {
      return (
        <Seat
          key={seatNumber + 1}
          seatNumber={seatNumber + 1}
          rowNumber={rowNumber}
        />
      )
    }
  )

  return <tr className="h-20">{seatItems}</tr>
}

export default Row
