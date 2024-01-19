import { Router } from 'express'
import { getChatMessages, getContacts, sendMessage } from './chat.controller.js'
const router = Router()

/**
 * @route   GET /api/message
 * @desc    Get a list of contacts a user chatted with and their last message
 * @access  public
 */
router.get('/', getContacts)

/**
 * @route   POST /api/message
 * @desc    Create a new message
 * @access  public
 * @body {receiverId, text, images[]}
 */
router.post('/', sendMessage)

/**
 * @route   GET /api/message/:contactId
 * @desc    Get a chat thread of a user made with the contact
 * @access  public
 */
router.get('/:contactId', getChatMessages)

export default router
