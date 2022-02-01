import { originAgentCluster } from "helmet";
import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";


class AttendeesService {

    async getMyAttendance(accountId) {
        const myAttendance = await dbContext.Attendance.find({ accountId: accountId }).populate('event')
        return myAttendance
    }

    async getEventAttendance(eventId) {
        const eventAttendance = await dbContext.Attendance.find({ eventId: eventId }).populate('account', 'name')
        return eventAttendance
    }

    async create(newAttendance) {
        await towerEventsService.decreaseCapacity(newAttendance.eventId)
        // if (newAttendance) {
        //     throw new BadRequest('Sold Out!')
        // }
        const createdAttendance = await dbContext.Attendance.create(newAttendance)
        await createdAttendance.populate('account', 'name picture')
        return createdAttendance
    }

    async remove(id, userId) {
        const foundAttendee = await dbContext.Attendance.findById(id)
        if (foundAttendee.accountId.toString() !== userId) {
            throw new BadRequest('Unable to Delete')
        }
        await towerEventsService.increaseCapacity(foundAttendee.eventId)
        await foundAttendee.remove()
        return foundAttendee
    }
}

export const attendeesService = new AttendeesService()