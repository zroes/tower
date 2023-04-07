import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "../models/Ticket.js"
import { TowerEvent } from "../models/TowerEvent.js"

class TicketsService {

  async getTickets(eventId) {
    AppState.tickets = []
    const res = await api.get('api/events/' + eventId + '/tickets')
    logger.log('[Getting Tickets for Event]', res.data)
    AppState.tickets = res.data.map(ticket => new Ticket(ticket))
  }
  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log('[Creating ticket]', res.data)
    AppState.tickets.push(new Ticket(res.data))
    AppState.activeEvent.capacity -= 1
  }

  async deleteTicket(ticketId) {
    const res = await api.delete('api/tickets/' + ticketId)
    logger.log('[Deleting Ticket]', ticketId, res.data)
    AppState.tickets = AppState.tickets.filter(ticket => ticket.id != ticketId)
    AppState.activeEvent.capacity += 1
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    logger.log('[Getting events I have tickets for]', res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))
    logger.log(AppState.tickets)
  }
}

export const ticketsService = new TicketsService()