import { attendeesService } from "../services/AttendeesService";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";


export class CommentsController extends BaseController {
    constructor() {
        super("api")
        this.router
            .get('/events/:id/comments', this.getEventComments)
            .post('/comments', this.createComment)
            .delete('/comments/:id', this.removeComment)
    }

    async getEventComments(req, res, next) {
        try {
            const eventComments = await commentsService.get(req.params.id)
            res.send(eventComments)
        } catch (error) {
            next(error)
        }
    }

    async createComment(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const createdComment = await commentsService.create(req.body)
            return res.send(createdComment)
        } catch (error) {
            next(error)
        }
    }

    async removeComment(req, res, next) {
        try {
            const updated = await commentsService.remove(req.params.id)
        } catch (error) {
            next(error)
        }
    }
}