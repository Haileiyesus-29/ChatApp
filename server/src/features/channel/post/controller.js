import RESPONSE from '../../../../config/_response.js'
import { createNewPost } from './service.js'

export async function makePost(req, res, next) {
   const { error, post } = await createNewPost(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(201).json(RESPONSE.success(post, 201))
}
