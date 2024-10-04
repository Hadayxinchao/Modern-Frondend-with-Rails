import * as React from "react"
import {
  Concert,
  buttonClass,
  makeFavorite,
  removeFavorite,
  useAppDispatch,
  useAppSelector,
} from "../../contexts/schedule_context"

export interface ConcertDisplayProps {
  concert: Concert
}

export const ConcertDisplay = ({
  concert,
}: ConcertDisplayProps): React.ReactElement => {
  const dispatch = useAppDispatch()

  const hasUser = useAppSelector((state) => state.userId !== null)
  const isFavorite = useAppSelector(
    (state) =>
      state.favorites.some((fav) => fav.id === concert.id) &&
      !state.removedFavoriteIds.includes(concert.id)
  )

  const soldOut = (): boolean => {
    return concert.ticketsRemaining === 0
  }

  const makeFavoriteOnClick = (): void => {
    dispatch(makeFavorite(concert))
  }

  const removeFavoriteOnClick = (): void => {
    dispatch(removeFavorite(concert))
  }

  return (
    <article className="my-6">
      <div className="grid gap-4 grid-cols-5">
        <div className="col-span-1 text-xl">{concert.startTime}</div>
        <div className="col-span-3">
          <div className="name">
            <div className="text-lg font-bold">
              <a href={`/concerts/${concert.id}`}>{concert.name}</a>
            </div>
          </div>
          <div className="bands">{concert.bandNames}</div>
          <div className="genres">{concert.genreTags}</div>
          <div className="text-gray-500 font-bold">{concert.venueName}</div>
        </div>
        <div className="col-span-1 text-xl">
          <span data-concert-target="tickets">
            {soldOut()
              ? "Sold Out"
              : `${concert.ticketsRemaining} tickets Remaining`}
          </span>
          <br />
          <br />
          <div className="flex">
            {hasUser && <a className={buttonClass}>Edit</a>}
            {hasUser && isFavorite && (
              <a className={buttonClass} onClick={removeFavoriteOnClick}>
                Unfavorite
              </a>
            )}
            {hasUser && !isFavorite && (
              <a className={buttonClass} onClick={makeFavoriteOnClick}>
                Favorite
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ConcertDisplay
