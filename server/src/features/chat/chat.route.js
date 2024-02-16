import { Router } from 'express'
import { getChatMessages, getContacts, sendMessage } from './chat.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
const router = Router()

router.use(authenticate)

/**
 * @route   GET /api/chat
 * @desc    Get a list of contacts a user chatted with and their last message
 * @access  private
 */
router.get('/', getContacts)

/**
 * @route   POST /api/chat
 * @desc    Create a new message
 * @access  private
 * @body {receiverId, text, images[]}
 */
router.post('/', sendMessage)

/**
 * @route   GET /api/chat/:contactId
 * @desc    Get a chat thread of a user made with the contact
 * @access  private
 */
router.get('/:contactId', getChatMessages)

export default router
