import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class TowerEventsService {

    async getAll() {
        const towerEvents = await dbContext.TowerEvents.find().populate('creator', 'name')
        return towerEvents
    }

    async getById(id) {
        const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name')
        if (!towerEvent) {
            throw new BadRequest('Invalid Tower Event')
        }
        return towerEvent
    }

    async create(newEvent) {
        const createdTowerEvent = await dbContext.TowerEvents.create(newEvent)
        await createdTowerEvent.populate('creator', 'name picture')
        return createdTowerEvent
    }

    async edit(updated) {
        const original = await dbContext.TowerEvents.findById({ _id: updated.id })
        if (original.creatorId.toString() !== updated.creatorId) {
            throw new BadRequest('Unable to Edit')
        }
        if (original.isCanceled == true) {
            throw new BadRequest('Cannot Edit Canceled Event')
        }
        original.name = updated.name || original.name
        original.description = updated.description || original.description
        original.coverImg = updated.coverImg || original.coverImg
        original.location = updated.location || original.location
        original.capacity = updated.capacity || original.capacity
        original.startDate = updated.startDate || original.startDate
        original.type = updated.type || original.type
        await original.save()
        return original
    }

    async remove(id, userId) {
        const original = await this.getById(id)
        if (original.creatorId.toString() !== userId) {
            throw new BadRequest('Cannot Delete')
        }
        await dbContext.TowerEvents.findOneAndUpdate({ _id: id, creatorId: userId }, { isCanceled: !original.isCanceled })
    }
}

export const towerEventsService = new TowerEventsService()