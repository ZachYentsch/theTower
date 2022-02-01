import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
    async createComment(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log(res.data)
    }

    async removeComment(id) {
        const res = a
    }
}

export const commentsService = new CommentsService()