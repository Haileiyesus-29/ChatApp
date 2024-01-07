import { Router } from 'express'
import { authenticate } from '../../../middlewares/authenticate.js'
import { makePost } from './controller.js'

const router = Router()

/**
 * @route   POST /api/channel/post
 * @desc    Create new post
 * @access  admin
 * @body    {channelId, text, images: []}
 */
router.post('/post', authenticate, makePost)

export default router
