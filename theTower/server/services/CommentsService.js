import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {

    async get(eventId) {
        const getComments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name')
        return getComments
    }

    async create(newComment) {
        const createdComment = await dbContext.Comments.create(newComment)
        await createdComment.populate('creator', 'name picture')
        return createdComment
    }

    async remove(id, userId) {
        const foundComment = await dbContext.Comments.findById(id)
        if (foundComment.creatorId.toString() !== userId) {
            throw new BadRequest('Unable to remove')
        }
        await foundComment.remove()
        return foundComment
    }


}

export const commentsService = new CommentsService()