import * as React from "react"
import Venue from "./venue"
import { venueReducer, initialState } from "../contexts/venue_context"
import { VenueAction, VenueState } from "../contexts/venue_types"
import { createConsumer, Subscription } from "@rails/actioncable"

export interface AppProps {
  concertId: number
  rowCount: number
  seatsPerRow: number
}

export interface IsVenueContext {
  state: VenueState
  dispatch: React.Dispatch<VenueAction>
}

export const VenueContext = React.createContext<IsVenueContext>(null)
export const SubscriptionContext = React.createContext<Subscription>(null)

let appSubscription: Subscription = null

const initSubscription = (
  state: VenueState,
  dispatch: React.Dispatch<VenueAction>
): Subscription => {
  if (!appSubscription) {
    appSubscription = createConsumer().subscriptions.create(
      { channel: "ConcertChannel", concertId: state.concertId },
      {
        received(tickets) {
          dispatch({ type: "setTickets", tickets })
        },
      }
    )
  }
  return appSubscription
}

export const App = (props: AppProps): React.ReactElement => {
  const [state, dispatch] = React.useReducer(
    venueReducer,
    initialState(props)
  )
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/tickets.json?concert_id=${props.concertId}`
      )
      const tickets = await response.json()
      dispatch({ type: "setTickets", tickets: tickets })
    }
    fetchData()
  }, [])

  return (
    <VenueContext.Provider value={{ state, dispatch }}>
      <SubscriptionContext.Provider
        value={initSubscription(state, dispatch)}>
        <Venue />
      </SubscriptionContext.Provider>
    </VenueContext.Provider>
  )
}

export default App
