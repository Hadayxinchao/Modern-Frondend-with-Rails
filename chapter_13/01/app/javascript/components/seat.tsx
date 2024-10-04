import * as React from "react"
import styled from "styled-components"
import {
  TicketData,
  TicketStatus,
} from "../contexts/venue_types"
import {
  seatChange,
  useAppDispatch,
  useAppSelector,
} from "../contexts/venue_context"

const stateColor = (status: string): string => {
  if (status === "unsold") {
    return "white"
  } else if (status === "held") {
    return "green"
  } else if (status === "purchased") {
    return "red"
  } else {
    return "yellow"
  }
}

interface SquareProps {
  status: TicketStatus
  className?: string
}
const buttonClass = "p-4 m-2 my-10 border-black border-4 text-lg"

const ButtonSquare = styled.span.attrs({
  className: buttonClass,
})<SquareProps>`
  background-color: ${(props) => stateColor(props.status)};
  transition: all 1s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.status === "unsold" ? "lightblue" : stateColor(props.status)};
  }
`

interface SeatProps {
  seatNumber: number
  rowNumber: number
}

export const Seat = ({
  seatNumber,
  rowNumber,
}: SeatProps): React.ReactElement => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const seatMatch = (ticketList: TicketData[], exact = false): boolean => {
    for (const heldTicket of ticketList) {
      const rowMatch = heldTicket.row == rowNumber
      const seatDiff = heldTicket.number - seatNumber
      const diff = exact ? 1 : state.ticketsToBuyCount
      const seatMatch = seatDiff >= 0 && seatDiff < diff
      if (rowMatch && seatMatch) {
        return true
      }
    }
    return false
  }

  const currentStatus = (): TicketStatus => {
    if (seatMatch(state.otherTickets, true)) {
      return "purchased"
    }
    if (seatMatch(state.myTickets, true)) {
      return "held"
    }
    if (
      seatMatch(state.otherTickets) ||
      seatMatch(state.myTickets) ||
      seatNumber + state.ticketsToBuyCount - 1 > state.seatsPerRow
    ) {
      return "invalid"
    }
    return "unsold"
  }

  const onSeatChange = (): void => {
    const status = currentStatus()
    if (status === "invalid" || status === "purchased") {
      return
    }
    dispatch(seatChange(status, rowNumber, seatNumber))
  }

  return (
    <td>
      <ButtonSquare status={currentStatus()} onClick={onSeatChange}>
        {seatNumber}
      </ButtonSquare>
    </td>
  )
}

export default Seat