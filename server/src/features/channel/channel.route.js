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

/**
 * @route   GET /api/channel/:channelId
 * @desc    Get channel details by ID
 * @access  Accessible to logged in user
 */
router.get('/:channelId', authenticate, getChannel)

/**
 * @route   GET /api/channel/members/:channelId
 * @desc    Get members of a channel by channel ID
 * @access  Accessible to logged in user
 */
router.get('/members/:channelId', authenticate, getMembers)

/**
 * @route   GET /api/channel/admins/:channelId
 * @desc    Get admins of a channel by ID
 * @access  Accessible to logged in user
 */
router.get('/admins/:channelId', authenticate, getAdmins)

/**
 * @route   POST /api/channel/join
 * @desc    Join a channel
 * @access  Accessible to logged in user
 * @body {channelId}
 */
router.post('/join', authenticate, joinChannel)

/**
 * @route   POST /api/channel/leave
 * @desc    Leave a channel
 * @access  Accessible to logged in user
 * @body {channelId}
 */
router.post('/leave', authenticate, leaveChannel)

/**
 * @route   POST /api/channel/admin
 * @desc    Add an admin to a channel
 * @access  Accessible only by the owner of the channel
 * @body {channelId, adminId}
 */
router.post('/admin', authenticate, addAdmin)

/**
 * @route   POST /api/channel/admin/remove
 * @desc    Remove an admin from a channel
 * @access  Accessible only by the owner of the channel
 * @body {channelId, adminId}
 */
router.post('/admin/remove', authenticate, removeAdmin)

/**
 * @route   POST /api/channel/
 * @desc    Create a new channel
 * @access  Accessible to logged in user
 * @body {name} required
 * @body { username,image,info,} optional
 */
router.post('/', authenticate, createChannel)

/**
 * @route   PUT /api/channel/:channelId
 * @desc    Update channel details by ID
 * @access  Accessible only for the owner or the admins of teh channel
 * @body {channelId}
 */
router.put('/', authenticate, updateChannel)

/**
 * @route   DELETE /api/channel/:channelId
 * @desc    Delete a channel by ID
 * @access  Accessible only for the owner of the channel
 */
router.delete('/:channelId', authenticate, deleteChannel)

export default router
