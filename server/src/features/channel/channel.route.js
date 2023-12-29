import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import {
   addAdmin,
   createChannel,
   deleteChannel,
   getAdmins,
   getChannel,
   getMembers,
   joinChannel,
   leaveChannel,
   removeAdmin,
   updateChannel,
} from './channel.controller.js'
const router = express.Router()

router.get('/:channelId', authenticate, getChannel)

router.get('/members/:channelId', authenticate, getMembers)
router.get('/admins/:channelId', authenticate, getAdmins)

router.post('/join', authenticate, joinChannel)
router.post('/leave', authenticate, leaveChannel)

router.post('/admin', authenticate, addAdmin)
router.post('/admin/remove', authenticate, removeAdmin)

router.post('/', authenticate, createChannel)
router.put('/:channelId', authenticate, updateChannel)
router.delete('/:channelId', authenticate, deleteChannel)

export default router
