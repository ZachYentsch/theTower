import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {

    async get(eventId) {
        const comments = await dbContext.Comments.find(eventId)
        if (!comments) {
            throw new BadRequest('No comments')
        }
        return comments
    }

    async create(newComment) {
        const createdComment = await dbContext.Comments.create(newComment)
        await createdComment.populate('creator', 'name picture')
        return createdComment
    }

    // async remove(id, userId) {
    //     const original = await this.get(id)
    //     if (original.creatorId.toString() !== userId) {
    //         throw new BadRequest('Unable to remove')
    //     }
    //     await dbContext.Comments.findByIdAndDelete({ _id: id, creatorId: userId })
    // }


}

export const commentsService = new CommentsService()