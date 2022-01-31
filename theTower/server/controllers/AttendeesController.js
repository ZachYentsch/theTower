import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { attendeesService } from "../services/AttendeesService";
import { towerEventsService } from "../services/TowerEventsService";
import { logger } from '../utils/Logger'


export class AttendeesController extends BaseController {
    constructor() {
        super('api/attendees')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            // .use((req, res, next) => { logger.log('attendee controller'); next() })
            .post('', this.createAttendee)
            .delete('/:id', this.removeAttendee)
    }

    async createAttendee(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const createdAttendee = await attendeesService.create(req.body)
            return res.send(createdAttendee)
        } catch (error) {
            next(error)
        }
    }

    async removeAttendee(req, res, next) {
        try {
            const deletedAttendee = await attendeesService.remove(req.params.id, req.userInfo.id)
            res.send(deletedAttendee)
        } catch (error) {
            next(error)
        }
    }
}