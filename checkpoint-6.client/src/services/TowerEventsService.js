import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getTowerEvents() {
    const res = await api.get('api/events')
    logger.log('[Getting Events]', res.data)
    AppState.towerEvents = res.data.map(ev => new TowerEvent(ev))
  }

}

export const towerEventsService = new TowerEventsService()