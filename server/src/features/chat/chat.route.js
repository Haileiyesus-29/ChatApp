import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { getChats, sendMessage } from './chat.controller.js'
const router = express.Router()

router.get('/', authenticate, getChats)
router.post('/', authenticate, sendMessage)

export default router
