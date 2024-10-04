import * as React from "react"
import SearchForm from "./search_form"
import SearchResults from "./search_results"

export const TextFilter = (): React.ReactElement => {
  return (
    <div>
      <SearchForm />
      <SearchResults />
    </div>
  )
}

export default TextFilter
