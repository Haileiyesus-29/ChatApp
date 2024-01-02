import ERRORS from '../../../../config/_errors.js'
import { createNewPost } from './service.js'

export async function makePost(req, res, next) {
   if (!req.body.channelId) return next(ERRORS.BAD_REQUEST)

   const post = await createNewPost(req.user.id, req.body.channelId, req.body)
   if (!post) return next(ERRORS.INVALID_CREDENTIAL)
   res.status(201).json(post)
}
