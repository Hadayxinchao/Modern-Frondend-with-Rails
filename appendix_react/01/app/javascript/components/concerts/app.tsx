import * as React from "react"
import Venue from "./venue"
import {
  fetchData,
  initSubscription,
  venueStore,
} from "../../contexts/venue_context"
import { Provider } from "react-redux"

export interface AppProps {
  concertId: number
  rowCount: number
  seatsPerRow: number
}

export const App = (props: AppProps): React.ReactElement => {
  venueStore.dispatch({ type: "initFromProps", props })
  initSubscription()
  venueStore.dispatch(fetchData())

  return (
    <Provider store={venueStore}>
      <Venue />
    </Provider>
  )
}

export default App
