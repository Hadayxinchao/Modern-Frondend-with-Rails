import { AppProps } from "../components/app"
import { VenueState, VenueAction } from "./venue_types"

export const initialState = (props: AppProps): VenueState => {
  return {
    rowCount: props.rowCount,
    seatsPerRow: props.seatsPerRow,
    concertId: props.concertId,
    otherTickets: [],
    ticketsToBuyCount: 1,
    myTickets: [],
  }
}

export const venueReducer = (
  state: VenueState,
  action: VenueAction
): VenueState => {
  switch (action.type) {
    case "setTickets":
      return {
        ...state,
        otherTickets: action.tickets.filter(
          (ticket) => ticket.status === "purchased"
        ),
        myTickets: action.tickets.filter(
          (ticket) => ticket.status === "held"
        ),
      }
    case "setTicketsToBuy":
      return { ...state, ticketsToBuyCount: action.amount }
    case "holdTicket": {
      const newTickets = Array.from(
        Array(state.ticketsToBuyCount).keys()
      ).map((index) => {
        return {
          id: 0,
          row: action.rowNumber,
          number: action.seatNumber + index,
          status: "held",
        }
      })
      return {
        ...state,
        myTickets: [...state.myTickets, ...newTickets],
      }
    }
    case "unholdTicket": {
      const newTickets = state.myTickets.filter((ticket) => {
        const rowMatch = ticket.row == action.rowNumber
        const seatDiff = ticket.number - action.seatNumber
        const seatMatch =
          seatDiff >= 0 && seatDiff < state.ticketsToBuyCount
        return !(rowMatch && seatMatch)
      })
      return { ...state, myTickets: newTickets }
    }
    case "clearHolds": {
      return { ...state, myTickets: [] }
    }
    default:
      return state
  }
}
