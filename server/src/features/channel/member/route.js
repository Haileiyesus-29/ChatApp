import { Router } from 'express'
import {
   getAdmins,
   getChannel,
   getJoinedChannels,
   getMembers,
   joinChannel,
   leaveChannel,
} from './controller.js'

const router = Router()

/**
 * @route   GET /api/channel/:channelId
 * @desc    Get channel details by ID
 * @param   channelId the id of the target channel
 * @access  private
 */
router.get('/', getJoinedChannels)

/**
 * @route   GET /api/channel/:channelId
 * @desc    Get channel details by ID
 * @param   channelId the id of the target channel
 * @access  private
 */
router.get('/:channelId', getChannel)

/**
 * @route   GET /api/channel/members/:channelId
 * @desc    Get members of a channel by channel ID
 * @param   channelId the id of the target channel
 * @access  private
 */
router.get('/members/:channelId', getMembers)

/**
 * @route   GET /api/channel/admins/:channelId
 * @desc    Get admins of a channel by ID
 * @param   channelId the id of the target channel
 * @access  private
 */
router.get('/admins/:channelId', getAdmins)

/**
 * @route   POST /api/channel/join
 * @desc    Join a channel
 * @access  private
 * @body {channelId}
 */
router.post('/join', joinChannel)

/**
 * @route   POST /api/channel/leave
 * @desc    Leave a channel
 * @access  private
 * @body {channelId}
 */
router.post('/leave', leaveChannel)

export default router
