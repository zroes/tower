import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)

  }
  async create(req, res, next) {
    try {
      const ticketData = req.body
      ticketData.accountId = req.userInfo.id
      const newTicket = await ticketsService.create(ticketData)
      res.send(newTicket)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const ticketId = req.params.id
      const accountId = req.userInfo.id
      const message = await ticketsService.delete(ticketId, accountId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}