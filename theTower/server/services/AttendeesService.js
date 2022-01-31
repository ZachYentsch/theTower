import { originAgentCluster } from "helmet";
import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";


class AttendeesService {

    async getMyAttendance(accountid) {
        const myAttendance = await dbContext.Attendance.find(accountid).populate('account', 'name')
        if (!myAttendance) {
            throw new BadRequest("Unable to get your events")
        }
        return myAttendance
    }

    async getEventAttendance(eventId) {
        const eventAttendance = await dbContext.Attendance.find(eventId).populate('account', 'name')
        if (!eventAttendance) {
            throw new BadRequest('Invalid Event')
        }
        return eventAttendance
    }

    async create(newAttendance) {
        const increaseAttendance = await towerEventsService.increaseCapacity()
        const createdAttendance = await dbContext.Attendance.create(newAttendance)
        await createdAttendance.populate('account', 'name picture')
        increaseAttendance
        return createdAttendance
    }

    async remove(id, userId) {
        const original = await this.getMyAttendance(id)
        const decreaseAttendance = await towerEventsService.decreaseCapacity()
        if (original.accountId.toString() !== userId)
            decreaseAttendance
        await dbContext.Attendance.findByIdAndRemove({ _id: id, creatorId: userId })
    }
}

export const attendeesService = new AttendeesService()