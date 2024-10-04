import * as React from "react"
import Venue from "./venue"
import { venueReducer, initialState } from "../contexts/venue_context"
import { VenueAction, VenueState } from "../contexts/venue_types"

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
      <Venue />
    </VenueContext.Provider>
  )
}

export default App
