import { configureStore } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"
import { createConsumer, Subscription } from "@rails/actioncable"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export interface Concert {
  id: number
  startTime: string
  name: string
  bandNames: string
  genreTags: string
  venueName: string
  ticketsRemaining: number
  sortDate: number
}

export interface ScheduleDate {
  month: string
  date: number
  year: number
  weekday: string
  key: string
}

export type DayFiltered = "yes" | "no"

const reverseFiltered = (filtered: DayFiltered): DayFiltered => {
  return filtered === "yes" ? "no" : "yes"
}

export interface ScheduleDay {
  id: string
  day: ScheduleDate
  concerts: Concert[]
  filtered: DayFiltered
}

export interface IncomingScheduleData {
  scheduleDays: ScheduleDay[]
  favorites: Concert[]
  userId: number
}

type ScheduleMap = { [key: string]: ScheduleDay }

export interface ScheduleState {
  scheduleDays: ScheduleMap
  favorites: Concert[]
  userId: number
  textFilter: string
  searchResults: Concert[]
  favoritesVisible: boolean
  mostRecentFavoriteId: number
  removedFavoriteIds: number[]
}

let scheduleChannel: Subscription
let favoritesChannel: Subscription

export const initialState = {
  scheduleDays: {},
  favorites: [],
  userId: null,
  favoritesChannel: null,
  textFilter: "",
  searchResults: [],
  favoritesVisible: true,
  mostRecentFavoriteId: null,
  removedFavoriteIds: [],
}

export type ScheduleAction =
  | AddFavorite
  | CalendarToggle
  | ClearFilters
  | InitEmpty
  | InitFromData
  | RemoveFavorite
  | SetFavoritesChannel
  | SetScheduleChannel
  | UpdateTextFilter
  | FavoritesToggle
  | UpdateConcertRemaining

export interface InitEmpty {
  type: "initEmpty"
}

export interface InitFromData {
  type: "initFromData"
  data: IncomingScheduleData
}

export interface CalendarToggle {
  type: "calendarToggle"
  day: string
}

export interface ClearFilters {
  type: "clearFilters"
}

export interface UpdateTextFilter {
  type: "updateTextFilter"
  text: string
  results: Concert[]
}

export interface UpdateConcertRemaining {
  type: "updateConcertRemaining"
  concertId: number
  ticketsRemaining: number
}

export interface SetScheduleChannel {
  type: "setScheduleChannel"
  subscription: Subscription
}

export interface SetFavoritesChannel {
  type: "setFavoritesChannel"
  subscription: Subscription
}

export interface AddFavorite {
  type: "addFavorite"
  concert: Concert
}

export interface RemoveFavorite {
  type: "removeFavorite"
  concert: Concert
}

export interface FavoritesToggle {
  type: "favoritesToggle"
}

const defaultValues = (day: ScheduleDay): ScheduleDay => {
  return { ...day, filtered: "no" }
}

const propsToMap = (days: ScheduleDay[]): ScheduleMap => {
  const result = {}
  days.forEach((day) => (result[day.id] = defaultValues(day)))
  return result
}

export const visibleDays = (state: ScheduleState): ScheduleDay[] => {
  const anyFiltered = Object.values(state.scheduleDays).some(
    (day) => day.filtered === "yes"
  )
  if (anyFiltered) {
    return Object.values(state.scheduleDays).filter(
      (day) => day.filtered === "yes"
    )
  } else {
    return Object.values(state.scheduleDays)
  }
}

export const scheduleReducer = (
  state: ScheduleState = initialState,
  action: ScheduleAction
): ScheduleState => {
  switch (action.type) {
    case "initEmpty": {
      return initialState
    }
    case "initFromData": {
      return {
        ...state,
        scheduleDays: propsToMap(action.data.scheduleDays),
        favorites: action.data.favorites,
        userId: action.data.userId,
      }
    }
    case "calendarToggle": {
      const dayInQuestion = state.scheduleDays[action.day]
      const scheduleDays = {
        ...state.scheduleDays,
        [action.day]: {
          ...dayInQuestion,
          filtered: reverseFiltered(dayInQuestion.filtered),
        },
      }
      return {
        ...state,
        scheduleDays: scheduleDays,
      }
    }
    case "favoritesToggle": {
      return {
        ...state,
        favoritesVisible: !state.favoritesVisible,
      }
    }
    case "clearFilters": {
      const newDays = {}
      Object.values(state.scheduleDays).forEach(
        (day) => (newDays[day.id] = { ...day, filtered: "no" })
      )
      return {
        ...state,
        scheduleDays: newDays,
      }
    }
    case "updateTextFilter": {
      return {
        ...state,
        textFilter: action.text,
        searchResults: action.results,
      }
    }
    case "addFavorite": {
      return {
        ...state,
        mostRecentFavoriteId: action.concert.id,
        favorites: [...state.favorites, action.concert].sort(
          (a, b) => a.sortDate - b.sortDate
        ),
        removedFavoriteIds: state.removedFavoriteIds.filter((id) => {
          return id !== action.concert.id
        }),
      }
    }
    case "removeFavorite": {
      return {
        ...state,
        removedFavoriteIds: [
          ...state.removedFavoriteIds,
          action.concert.id,
        ],
      }
    }
    case "updateConcertRemaining": {
      const allDays = Object.values(state.scheduleDays).map((day) => {
        const matchingConcert = day.concerts.find(
          (concert) => (concert.id = action.concertId)
        )
        if (!matchingConcert) {
          return day
        }
        const newConcert = {
          ...matchingConcert,
          ticketsRemaining: action.ticketsRemaining,
        }
        const newConcerts = day.concerts.map((dayConcert) => {
          if (dayConcert.id === matchingConcert.id) {
            return newConcert
          } else {
            return dayConcert
          }
        })
        return {
          ...day,
          concerts: newConcerts,
        }
      })
      const newDays = propsToMap(allDays)
      return {
        ...state,
        scheduleDays: newDays,
      }
    }
  }
}

export const scheduleStore = configureStore({ reducer: scheduleReducer })
export type RootState = ReturnType<typeof scheduleStore.getState>
export type AppDispatch = typeof scheduleStore.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type ScheduleThunk = ThunkAction<
  void,
  ScheduleState,
  null | undefined,
  ScheduleAction
>

interface ScheduleChannelData {
  concerts: ConcertRemainingData[]
}

interface ConcertRemainingData {
  concertId: number
  ticketsRemaining: number
}

export const initScheduleChannel = (): ScheduleThunk => {
  if (scheduleChannel !== undefined) {
    return
  }
  scheduleChannel = createConsumer().subscriptions.create(
    "ScheduleChannel",
    {
      async received(data) {
        const parsedData = (await data.json()) as ScheduleChannelData
        parsedData.concerts.forEach((concertData) => {
          scheduleStore.dispatch({
            type: "updateConcertRemaining",
            concertId: concertData.concertId,
            ticketsRemaining: concertData.ticketsRemaining,
          })
        })
      },
    }
  )
}

interface FavoritesControllerData {
  type: "addFavorite" | "removeFavorite"
  concertId: number
}

const getConcerts = (state: ScheduleState): Concert[] => {
  return Object.values(state.scheduleDays).flatMap(
    (scheduleDay) => scheduleDay.concerts
  )
}

const getConcert = (state: ScheduleState, concertId: number): Concert => {
  return getConcerts(state).find((concert) => concert.id === concertId)
}

export const initFavoritesChannel = (name: string): ScheduleThunk => {
  if (favoritesChannel !== undefined) {
    return
  }
  favoritesChannel = createConsumer().subscriptions.create(
    { channel: "Turbo::StreamsChannel", "signed-stream-name": name },
    {
      async received(data) {
        const parsedData = (await data.json()) as FavoritesControllerData
        scheduleStore.dispatch({
          type: parsedData.type,
          concert: getConcert(
            scheduleStore.getState(),
            parsedData.concertId
          ),
        })
      },
    }
  )
}

export const fetchData = (): ScheduleThunk => {
  return async (dispatch) => {
    const response = await fetch("/schedule.json")
    const data = await response.json()
    dispatch({ type: "initFromData", data: data as IncomingScheduleData })
  }
}

const csrfToken = (
  document.querySelector("[name='csrf-token']") as HTMLElement
).getAttribute("content")

export const makeFavorite = (concert: Concert): ScheduleThunk => {
  return async (dispatch) => {
    const formData = new FormData()
    formData.append("concert_id", String(concert.id))
    await fetch("/favorites.js", {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-Token": csrfToken,
        credentials: "same-origin",
      },
    })
    dispatch({ type: "addFavorite", concert })
  }
}

export const removeFavorite = (concert: Concert): ScheduleThunk => {
  return async (dispatch) => {
    const formData = new FormData()
    await fetch(`/favorites/${concert.id}.js`, {
      method: "DELETE",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-Token": csrfToken,
        credentials: "same-origin",
      },
    })
    dispatch({ type: "removeFavorite", concert })
  }
}

export const search = (searchTerm: string): ScheduleThunk => {
  return async (dispatch) => {
    let concerts: Concert[] = []
    if (searchTerm !== "") {
      const response = await fetch(`/concerts.json?query=${searchTerm}`)
      const data = await response.json()
      concerts = data.concerts
    }
    dispatch({
      type: "updateTextFilter",
      results: concerts as Concert[],
      text: searchTerm,
    })
  }
}

export const buttonClass =
  "h-10 px-5 py-1 m-2 " +
  "text-white " +
  "transition-colors duration-150 " +
  "bg-gray-800 rounded-lg focus:shadow-outline " +
  "border-black border"
