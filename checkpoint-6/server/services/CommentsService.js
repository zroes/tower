import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async getCommentsForEvent(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId })
      .populate('creator')
    return comments
  }
  async create(commentData) {
    const newComment = await dbContext.Comments.create(commentData)
    await newComment.populate('creator')
    return newComment
  }

  async delete(commentId, accountId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    if (!commentToDelete)
      throw new BadRequest('that comment does not exist')

    if (commentToDelete.creatorId != accountId)
      throw new Forbidden('unable to delete comment: unauthorized user')

    commentToDelete.remove()
    return `${commentId} was deleted`
  }

}

export const commentsService = new CommentsService()