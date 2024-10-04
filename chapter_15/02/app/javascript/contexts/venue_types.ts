import { AppProps } from "../components/app"

export enum TicketStatus {
  Unsold = "unsold",
  Held = "held",
  Purchased = "purchased",
  Refunded = "refunded",
  Invalid = "invalid",
}

export interface TicketData {
  id: number
  number: number
  row: number
  status: TicketStatus
}

interface SetTicketToBuy {
  type: "setTicketsToBuy"
  amount: number
}

interface HoldTicket {
  type: "holdTicket"
  seatNumber: number
  rowNumber: number
}

interface UnholdTicket {
  type: "unholdTicket"
  seatNumber: number
  rowNumber: number
}

interface ClearHolds {
  type: "clearHolds"
}

interface SetTickets {
  type: "setTickets"
  tickets: TicketData[]
}

export interface InitFromProps {
  type: "initFromProps"
  props: AppProps
}

export interface VenueState {
  concertId: number
  myTickets: TicketData[]
  otherTickets: TicketData[]
  rowCount: number
  seatsPerRow: number
  ticketsToBuyCount: number
}

export type VenueAction =
  | ClearHolds
  | HoldTicket
  | InitFromProps
  | SetTicketToBuy
  | SetTickets
  | UnholdTicket
