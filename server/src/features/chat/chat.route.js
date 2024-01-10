import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { getChatMessages, getContacts, sendMessage } from './chat.controller.js'
const router = express.Router()

router.get('/', authenticate, getContacts)
router.post('/', authenticate, sendMessage)
router.get('/:contactId', authenticate, getChatMessages)

export default router
