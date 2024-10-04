import * as React from "react"
import {
  buttonClass,
  useAppDispatch,
  useAppSelector,
} from "../../contexts/schedule_context"
import ScheduleFavorite from "./favorite"

export const Favorites = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const {
    favoritesVisible,
    favorites,
    mostRecentFavoriteId,
    removedFavoriteIds,
  } = useAppSelector((state) => state)

  const toggleFavoriteClick = () => {
    dispatch({ type: "favoritesToggle" })
  }

  return (
    <section className="my-4" id="favorite-section">
      <div className="text-3xl font-bold">
        Favorite Concerts
        <span
          className={`${buttonClass} blue-hover bg-black ml-4`}
          onClick={toggleFavoriteClick}>
          <img
            src="/chevron-right.svg"
            width={25}
            height={25}
            className={`inline ${
              favoritesVisible ? "is-open" : "is-closed"
            }`}
          />
        </span>
      </div>
      <div
        className={`${favoritesVisible ? "" : "hidden"}`}
        id="favorite-concerts-list">
        {favorites.map((result, index) => {
          return (
            <ScheduleFavorite
              key={index}
              favorite={result}
              animateIn={result.id === mostRecentFavoriteId}
              shouldBeVisible={!removedFavoriteIds.includes(result.id)}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Favorites
