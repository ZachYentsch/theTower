import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class AttendeesService {

    async getMyAttendance(id) {
        const myAttendance = await dbContext.Attendance.findById(id).populate('creator', 'name')
        if (!myAttendance) {
            throw new BadRequest("Unable to get your events")
        }
        return myAttendance
    }

    async create(newAttendance) {
        const createdAttendance = await dbContext.Attendance.create(newAttendance)
        await createdAttendance.populate('creator', 'name picture')
        return createdAttendance
    }
}

export const attendeesService = new AttendeesService()