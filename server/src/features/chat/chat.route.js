import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { getChats } from './chat.controller.js'
const router = express.Router()

router.get('/', authenticate, getChats)
router.post('/', authenticate)

export default router
