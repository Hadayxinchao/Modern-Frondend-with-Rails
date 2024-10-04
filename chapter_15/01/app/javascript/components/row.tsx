import * as React from "react"
import Seat from "./seat"
import { useAppSelector } from "../contexts/venue_context"

interface RowProps {
  rowNumber: number
}

const Row = ({ rowNumber }: RowProps): React.ReactElement => {
  const seatsPerRow = useAppSelector((state) => state.seatsPerRow)

  const seatItems = Array.from(Array(seatsPerRow).keys()).map(
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
