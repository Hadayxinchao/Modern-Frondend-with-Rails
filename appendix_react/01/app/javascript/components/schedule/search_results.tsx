import * as React from "react"
import { useAppSelector } from "../../contexts/schedule_context"
import { SearchResult } from "./search_result"

export const SearchResults = (): React.ReactElement => {
  const results = useAppSelector((state) => state.searchResults)

  const displayResults = (): boolean => {
    return (results?.length || 0) > 0
  }

  return (
    displayResults() && (
      <section
        className={`fixed bg-gray-300 z-10
                  rounded-3xl ring-4 ring-gray-800
                  max-w-screen-lg halfway w-full
                  mr-20 ml-32 px-6 py-2 mt-2
                  overflow-y-auto overscroll-contain`}>
        <div className="text-3xl font-bold text-center">Search Results</div>
        {results.map((result, index) => (
          <SearchResult key={index} result={result} />
        ))}
      </section>
    )
  )
}

export default SearchResults
