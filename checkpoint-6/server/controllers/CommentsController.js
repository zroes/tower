import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { commentsService } from "../services/CommentsService.js"

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }
  async create(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const newComment = await commentsService.create(commentData)
      res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const commentId = req.params.id
      const accountId = req.userInfo.id
      const message = await commentsService.delete(commentId, accountId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}