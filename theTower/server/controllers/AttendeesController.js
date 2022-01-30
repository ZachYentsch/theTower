import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { attendeesService } from "../services/AttendeesService";
import { towerEventsService } from "../services/TowerEventsService";


export class AttendeesController extends BaseController {
    constructor() {
        super("/a")
        this.router
            .get('ccount/attendees', this.getMyAttendance)
            .get('events/:id/attendees', this.getEventAttendees)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('pi/attendees', this.createAttendee)
            .delete('pi/attendees/:id', this.removeAttendee)
    }

    async getMyAttendance(req, res, next) {
        try {
            const myAttendance = await attendeesService.getMyAttendance()
            return res.send(myAttendance)
        } catch (error) {
            next(error)
        }
    }

    async getEventAttendees(req, res, next) {
        try {
            const eventAttendee = await attendeesService.getEventAttendance(req.params.id)
        } catch (error) {
            next(error)
        }
    }
    async createAttendee(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            req.body.eventId = req.DbContext.TowerEvents.id
            const createdAttendee = await attendeesService.create(req.body)
            return res.send(createdAttendee)
        } catch (error) {
            next(error)
        }
    }

    async removeAttendee(req, res, next) {
        try {
            const updated = await attendeesService.remove(req.params.id)
        } catch (error) {
            next(error)
        }
    }
}