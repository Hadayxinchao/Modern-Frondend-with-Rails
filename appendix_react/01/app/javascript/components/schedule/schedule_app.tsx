import * as React from "react"
import ScheduleFilter from "./filter"
import ScheduleDisplay from "./schedule_display"
import ScheduleFavorites from "./favorites"
import {
  fetchData,
  scheduleStore,
  initScheduleChannel,
  initFavoritesChannel,
} from "../../contexts/schedule_context"
import { Provider } from "react-redux"

interface ScheduleAppProps {
  favoriteChannelName: string
}

export const ScheduleApp = ({
  favoriteChannelName,
}: ScheduleAppProps): React.ReactElement => {
  const store = scheduleStore
  store.dispatch({ type: "initEmpty" })
  initScheduleChannel()
  initFavoritesChannel(favoriteChannelName)
  store.dispatch(fetchData())
  return (
    <Provider store={store}>
      <section>
        <ScheduleFilter />
        <ScheduleFavorites />
        <ScheduleDisplay />
      </section>
    </Provider>
  )
}
export default ScheduleApp
