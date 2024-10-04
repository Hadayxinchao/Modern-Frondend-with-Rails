import * as React from "react"
import {
  ScheduleState,
  search,
  useAppDispatch,
  useAppSelector,
} from "../../contexts/schedule_context"

export const SearchForm = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const textFilter = useAppSelector((state) => state.textFilter)

  const handleChange = (event: React.SyntheticEvent): void => {
    const textArea = event.target as HTMLInputElement
    dispatch(search(textArea.value))
  }

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <input
          type="search"
          name="query"
          id="search_query"
          value={textFilter}
          placeholder="Search concerts"
          className="w-full px-3 py-2 border border-gray-400 rounded-lg"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SearchForm
