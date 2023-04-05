import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {

  async getMine(accountId) {
    const myTickets = await dbContext.Tickets.find({ accountId: accountId }).populate('event')
    return myTickets
  }
  async getTicketsForEvent(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId })
      .populate('profile', 'name picture')
    return tickets
  }

  async create(ticketData) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('profile')
    await newTicket.populate('event')
    const thisEvent = await towerEventsService.getById(ticketData.eventId)

    if (thisEvent.capacity <= 0)
      throw new BadRequest('there is no capacity left for this event')

    await towerEventsService.changeCapacity(newTicket.eventId, -1)

    // try {
    //   await towerEventsService.edit({ capacity: thisEvent.capacity - 1 }, ticketData.eventId, ticketData.accountId)
    // } catch (error) {
    //   // return 'something went wrong'
    // }
    return newTicket
  }

  async delete(ticketId, accountId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    if (!ticketToDelete)
      throw new BadRequest('that ticket does not exist')

    if (ticketToDelete.accountId != accountId)
      throw new Forbidden('you do not have permission to delete this ticket')



    // const thisEvent = await towerEventsService.getById(ticketToDelete.eventId)
    await towerEventsService.changeCapacity(ticketToDelete.eventId, 1)
    // try {
    //   await towerEventsService.edit({ capacity: thisEvent.capacity + 1 }, ticketToDelete.eventId, ticketToDelete.accountId)
    // } catch (error) { }
    ticketToDelete.remove()


    return `${ticketId} was deleted`
  }

}

export const ticketsService = new TicketsService