import * as React from "react"
import styled from "styled-components"
import {
  clearCart,
  useAppDispatch,
  useAppSelector,
} from "../../contexts/venue_context"

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
`

const buttonClass =
  "px-5 py-4 m-2 my-4 w-40 text-center text-white transition-colors " +
  "duration-150 bg-gray-800 rounded-lg focus:shadow-outline hover:bg-black"

const Subtotal = (): React.ReactElement => {
  const myTickets = useAppSelector((state) => state.myTickets)
  const dispatch = useAppDispatch()

  const onClear = () => {
    dispatch(clearCart())
  }
  return (
    <>
      <Header>
        <span>Current Tickets Purchased: &nbsp;</span>
        <span data-cy="ticketsPurchased">{myTickets.length}</span>
      </Header>
      <Header>
        <span>Current Tickets Cost: &nbsp;</span>
        <span data-cy="ticketCost">${myTickets.length * 15}.00</span>
      </Header>
      <div className={buttonClass} onClick={onClear} data-cy="clearButton">
        Clear Tickets
      </div>
    </>
  )
}

export default Subtotal
