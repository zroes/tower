import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
  async getAll() {
    const towerEvents = await dbContext.TowerEvents.find()
    return towerEvents
  }

  async getById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
    if (towerEvent == null) {
      throw new BadRequest('This event does not exist.')
    }
    return towerEvent
  }

  async create(eventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(eventData)
    return newTowerEvent
  }

  async edit(eventData, eventId, accountId) {
    const towerEventToEdit = await this.getById(eventId)

    if (towerEventToEdit.isCanceled)
      throw new BadRequest(`you cannot edit a canceled event`)

    if (towerEventToEdit.creatorId != accountId)
      throw new Forbidden('you cannot edit an event you did not create')

    if (eventData.isCanceled)
      eventData.isCanceled = false

    const editTowerEvent = await dbContext.TowerEvents
      .findByIdAndUpdate(eventId, eventData)
    return editTowerEvent
  }

  async cancel(eventId, accountId) {
    const eventToDelete = await this.getById(eventId)
    if (eventToDelete.creatorId != accountId) {
      throw new Forbidden(`You do not have permission to archive Event ${eventToDelete.name}.`)
    }
    if (eventToDelete.isCanceled == true) {
      throw new Forbidden(`Event: ${eventToDelete.name} has already been canceled.`)
    }
    eventToDelete.isCanceled = true  // !eventToDelete.isCanceled
    await eventToDelete.save()
    return eventToDelete
  }

  async changeCapacity(eventId, num) {
    const thisEvent = await dbContext.TowerEvents.findById(eventId)
    // await dbContext.TowerEvents.findByIdAndUpdate(eventId, { capacity: capacity + num })
    thisEvent.capacity += num
    thisEvent.save()
  }

}

export const towerEventsService = new TowerEventsService()