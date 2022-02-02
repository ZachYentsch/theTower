export class TowerEvent {
    constructor(data = {}) {
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.description
        this.startDate = data.startDate
        this.type = data.type
        this.isCanceled = data.isCanceled
        this.id = data.id
    }
}