import { VenueState, VenueAction } from "./venue_types"
import { configureStore } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"
import { createConsumer } from "@rails/actioncable"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { Subscription } from "@rails/actioncable"

export const initialState = {
  rowCount: 1,
  seatsPerRow: 1,
  concertId: 0,
  otherTickets: [],
  ticketsToBuyCount: 1,
  myTickets: [],
}

let subscription: Subscription

export const initSubscription = (): void => {
  if (subscription === undefined) {
    subscription = createConsumer().subscriptions.create(
      {
        channel: "ConcertChannel",
        concertId: venueStore.getState().concertId,
      },
      {
        received(tickets) {
          venueStore.dispatch({ type: "setTickets", tickets })
        },
      }
    )
  }
}

type VenueThunk = ThunkAction<void, VenueState, null, VenueAction>

export const fetchData = (): VenueThunk => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `/tickets.json?concert_id=${getState().concertId}`
    )
    const tickets = await response.json()
    dispatch({ type: "setTickets", tickets })
  }
}

export const seatChange = (
  status: string,
  rowNumber: number,
  seatNumber: number
): VenueThunk => {
  return async (dispatch, getState) => {
    const actionType = status === "unsold" ? "holdTicket" : "unholdTicket"
    await subscription.perform("added_to_cart", {
      concertId: getState().concertId,
      row: rowNumber,
      seatNumber: seatNumber,
      status: actionType === "holdTicket" ? "held" : "unsold",
      ticketsToBuyCount: getState().ticketsToBuyCount,
    })
    dispatch({ type: actionType, seatNumber, rowNumber })
  }
}

export const clearCart = (): VenueThunk => {
  return async (dispatch, getState) => {
    await subscription.perform("removed_from_cart", {
      concertId: getState().concertId,
      tickets: getState().myTickets,
    })
    dispatch({ type: "clearHolds" })
  }
}

export const venueReducer = (
  state: VenueState = initialState,
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
    case "initFromProps": {
      return {
        ...state,
        concertId: action.props.concertId,
        rowCount: action.props.rowCount,
        seatsPerRow: action.props.seatsPerRow,
      }
    }
    default:
      return state
  }
}

export const venueStore = configureStore({ reducer: venueReducer })
export type RootState = ReturnType<typeof venueStore.getState>
export type AppDispatch = typeof venueStore.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
