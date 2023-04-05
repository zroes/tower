import { Auth0Provider } from "@bcwdev/auth0provider"
import { towerEventsService } from "../services/TowerEventsService.js"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"
import { commentsService } from "../services/CommentsService.js"


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tickets', this.getTicketsForEvent)
      .get('/:id/comments', this.getCommentsForEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.cancel)
  }
  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll()
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const eventId = req.params.id
      const towerEvent = await towerEventsService.getById(eventId)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsForEvent(req, res, next) {
    try {
      const eventId = req.params.id
      const tickets = await ticketsService.getTicketsForEvent(eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsForEvent(req, res, next) {
    try {
      const eventId = req.params.id
      const comments = await commentsService.getCommentsForEvent(eventId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const newTowerEvent = await towerEventsService.create(eventData)
      return res.send(newTowerEvent)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const eventId = req.params.id
      const eventData = req.body
      const accountId = req.userInfo.id
      const editTowerEvent = await towerEventsService.edit(eventData, eventId, accountId)
      res.send(editTowerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      const eventId = req.params.id
      let accountId = req.userInfo.id
      const towerEvent = await towerEventsService.cancel(eventId, accountId)
      res.send(`${towerEvent.name} was succesfully canceled`)
    } catch (error) {
      next(error)
    }
  }
}