import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";


class AttendeesService {

    async getMyAttendance(accountid) {
        const myAttendance = await dbContext.Attendance.findById(accountid).populate('creator', 'name')
        if (!myAttendance) {
            throw new BadRequest("Unable to get your events")
        }
        return myAttendance
    }

    async getEventAttendance(eventId) {
        const eventAttendance = await dbContext.Attendance.find(eventId).populate('creator', 'name')
        if (!eventAttendance) {
            throw new BadRequest('Invalid Event')
        }
        return eventAttendance
    }

    async create(newAttendance) {
        const createdAttendance = await dbContext.Attendance.create(newAttendance)
        await createdAttendance.populate('creator', 'name picture')
        return createdAttendance
    }

    async remove(id, userId) {
        const original = await this.getMyAttendance(id)
        if (original.creatorId.toString() !== userId) {
            throw new BadRequest('Unable to Remove')
        }
        await dbContext.Attendance.findByIdAndRemove({ _id: id, creatorId: userId })
    }
}

export const attendeesService = new AttendeesService()