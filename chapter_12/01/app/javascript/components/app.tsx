import * as React from "react"
import Venue from "./venue"
import { venueStore, AppDispatch } from "../contexts/venue_context"
import { VenueAction, VenueState } from "../contexts/venue_types"
import { createConsumer, Subscription } from "@rails/actioncable"
import { Provider } from "react-redux"

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
  dispatch: AppDispatch
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
  venueStore.dispatch({ type: "initFromProps", props })
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/tickets.json?concert_id=${props.concertId}`
      )
      const tickets = await response.json()
      venueStore.dispatch({ type: "setTickets", tickets: tickets })
    }
    fetchData()
  }, [])

  return (
    <Provider store={venueStore}>
      <Venue />
    </Provider>
  )
}

export default App
