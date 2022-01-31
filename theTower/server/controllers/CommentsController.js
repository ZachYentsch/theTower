import { Auth0Provider } from "@bcwdev/auth0provider";
import { attendeesService } from "../services/AttendeesService";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";


export class CommentsController extends BaseController {
    constructor() {
        super("api/comments")
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:id', this.removeComment)
    }


    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const createdComment = await commentsService.create(req.body)
            return res.send(createdComment)
        } catch (error) {
            next(error)
        }
    }

    async removeComment(req, res, next) {
        try {
            const updated = await commentsService.remove(req.params.id, req.userInfo.id)
            res.send(updated)
        } catch (error) {
            next(error)
        }
    }
}