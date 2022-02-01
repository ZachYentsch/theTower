import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {

    async getComments(id) {
        const res = await api.get(`api/events/${id}/comments`)
        logger.log(res.data)
        AppState.comments = res.data
    }
    async createComment(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log(res.data)
    }

    async removeComment(id) {
        const res = await api.delete('api/comments/' + id)
        logger.log(res.data)
        AppState.towerEvents = AppState.towerEvents.filter(t => t.id != towerEvent.id)
    }
}

export const commentsService = new CommentsService()