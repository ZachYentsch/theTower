import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController"
import { towerEventsService } from "../services/TowerEventsService"

export class TowerEventsController extends BaseController {

    constructor() {
        super("api/events")
        this.router
            .get('', this.getAllEvents)
            .get('/:id', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:id', this.editEvent)
            .delete('/:id', this.removeEvent)
    }

    async getAllEvents(req, res, next) {
        try {
            const events = await towerEventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const towerEventid = await towerEventsService.getById(req.params.id)
            return res.send(towerEventid)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const createdTowerEvent = await towerEventsService.create(req.body)
            return res.send(createdTowerEvent)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const editedTowerEvent = await towerEventsService.edit(req.body)
            return res.send(editedTowerEvent)
        } catch (error) {
            next(error)
        }
    }

    async removeEvent(req, res, next) {
        try {
            const updated = await towerEventsService.remove(req.params.id, req.userInfo.id)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
}