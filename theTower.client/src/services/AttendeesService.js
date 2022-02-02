import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AttendeesService {
    async getEventAttendees(id) {
        const res = await api.get(`api/events/${id}/attendees`)
        logger.log(res.data)
        AppState.attendees = res.data
    }
    async createAttendee(newAttendee) {
        const res = await api.post('api/attendees', newAttendee)
        logger.log(res.data)
        AppState.myTowerEvents = res.data
    }

    async removeAttendee(id) {
        const res = await api.delete('api/attendees/' + id)
        logger.log('Removed Attendee', res.data)
        AppState.myTowerEvents = AppState.myTowerEvents.filter(a => a.id !== id)
    }
}

export const attendeesService = new AttendeesService()