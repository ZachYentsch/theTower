import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { attendeesService } from "../services/AttendeesService";


export class AttendeesController extends BaseController {
    constructor() {
        super("/api/")
        this.router
            // .get('ccount/attendees', this.getMyAttendance)
            // .get('events/:id/attendees', this.getEventAttendees)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('attendees', this.createAttendee)
        // .delete('attendees/:id', this.removeAttendee)
    }

    async createAttendee(req, res, next) {
        try {
            // req.body.accountId = req.accountId.id
            req.body.creatorId = req.userInfo.id
            const createdAttendee = await attendeesService.create(req.body)
            return res.send(createdAttendee)
        } catch (error) {
            next(error)
        }
    }
}