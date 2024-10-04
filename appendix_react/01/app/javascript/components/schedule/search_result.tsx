import * as React from "react"
import { Concert } from "../../contexts/schedule_context"

interface SearchResultProps {
  result: Concert
}

const ticketString = (concert: Concert): string => {
  if (concert.ticketsRemaining === 0) {
    return "Sold Out"
  } else {
    return `${concert.ticketsRemaining} Tickets Remaining`
  }
}

export const SearchResult = ({
  result,
}: SearchResultProps): React.ReactElement => {
  return (
    <article className="my-6 max-w-screen-lg">
      <div>
        {result.startTime}
        <div className="font-bold text-xl">
          <a href="/concerts/{result.id}">{result.name}</a>
          <div className="float-right">{ticketString(result)}</div>
        </div>
        <div>{result.bandNames}</div>
        <div>{result.genreTags}</div>
        <div>{result.venueName}</div>
      </div>
    </article>
  )
}

export default SearchResult
