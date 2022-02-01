import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
    async createComment(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log(res.data)
    }
}

export const commentsService = new CommentsService()