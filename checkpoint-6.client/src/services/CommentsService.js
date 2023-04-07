import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"
class CommentsService {


  async getAll(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log('[Getting comments]', res.data)
    AppState.comments = res.data.map(comment => new Comment(comment))
  }

  async postComment(body, eventId) {
    const commentData = {}
    commentData.body = body
    commentData.eventId = eventId
    const res = await api.post('api/comments', commentData)
    logger.log('[Posting Comment]', res.data)
    AppState.comments.push(new Comment(res.data))
  }

  async deleteComment(commentId) {
    const res = await api.delete('api/comments/' + commentId)
    logger.log('[Deleting Comment]', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }
}

export const commentsService = new CommentsService()