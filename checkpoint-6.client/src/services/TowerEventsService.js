import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getTowerEvents() {
    const res = await api.get('api/events')
    logger.log('[Getting Events]', res.data)
    AppState.towerEvents = res.data.map(ev => new TowerEvent(ev))
  }

  async getById(eventId) {
    AppState.activeEvent = null
    const res = await api.get('api/events/' + eventId)
    logger.log('[Getting Event by id', res.data)
    AppState.activeEvent = new TowerEvent(res.data)
  }


  async createEvent(towerEventData) {
    const res = await api.post('api/events', towerEventData)
    logger.log('[Creating new event]', res.data)
    const newTowerEvent = new TowerEvent(res.data)
    AppState.towerEvents.push(newTowerEvent)
    AppState.activeEvent = newTowerEvent
    return newTowerEvent
  }

  async cancelEvent(eventId) {
    const res = await api.delete('api/events/' + eventId)
    logger.log('[Canceling event]', res.data)
    this.getById(eventId)
  }


}

export const towerEventsService = new TowerEventsService()