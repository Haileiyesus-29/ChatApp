import { Router } from 'express'
import {
   getAdmins,
   getChannel,
   getMembers,
   joinChannel,
   leaveChannel,
} from './controller.js'
import { authenticate } from '../../../middlewares/authenticate.js'

const router = Router()

/**
 * @route   GET /api/channel/:channelId
 * @desc    Get channel details by ID
 * @param   channelId the id of the target channel
 * @access  private
 */
router.get('/:channelId', authenticate, getChannel)

/**
 * @route   GET /api/channel/members/:channelId
 * @desc    Get members of a channel by channel ID
 * @param   channelId the id of the target channel
 * @access  private
 */
router.get('/members/:channelId', authenticate, getMembers)

/**
 * @route   GET /api/channel/admins/:channelId
 * @desc    Get admins of a channel by ID
 * @param   channelId the id of the target channel
 * @access  private
 */
router.get('/admins/:channelId', authenticate, getAdmins)

/**
 * @route   POST /api/channel/join
 * @desc    Join a channel
 * @access  private
 * @body {channelId}
 */
router.post('/join', authenticate, joinChannel)

/**
 * @route   POST /api/channel/leave
 * @desc    Leave a channel
 * @access  private
 * @body {channelId}
 */
router.post('/leave', authenticate, leaveChannel)

export default router
