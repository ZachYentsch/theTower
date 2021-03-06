import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class TowerEventsService {
    async getAllEvents() {
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.towerEvents = res.data
        AppState.filteredEvents = res.data
    }

    async getEventById(id) {
        const res = await api.get('api/events/' + id)
        logger.log(res.data)
        // NOTE don't need to utitlize client side model
        AppState.activeEvent = res.data
    }

    async getMyEvents() {
        const res = await api.get('account/attendees')
        logger.log(res.data)
        AppState.myTowerEvents = res.data
    }

    async createTowerEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        logger.log(res.data)
        return res.data
    }

    async editTowerEvent(updatedEvent, id) {
        const res = await api.put('api/events/' + id, updatedEvent)
        logger.log(res.data)
        AppState.activeEvent = new TowerEvent(res.data)
    }

    async removeTowerEvent(id) {
        const res = await api.delete('api/events/' + id)
        logger.log('removed Project', res.data)
        AppState.towerEvents = AppState.towerEvents.filter(t => t.id != t.id)
    }
}

export const towerEventsService = new TowerEventsService()