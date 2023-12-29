import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import {
   createChannel,
   deleteChannel,
   getChannel,
   updateChannel,
} from './channel.controller.js'
const router = express.Router()

router.get('/:channelId', authenticate, getChannel)
router.post('/', authenticate, createChannel)
router.put('/:channelId', authenticate, updateChannel)
router.delete('/:channelId', authenticate, deleteChannel)

export default router
