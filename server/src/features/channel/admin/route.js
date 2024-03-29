import { Router } from 'express'
import {
   addAdmin,
   createChannel,
   deleteChannel,
   removeAdmin,
   updateChannel,
} from './controller.js'

const router = Router()

/**
 * @route   POST /api/channel/admin
 * @desc    Add an admin to a channel
 * @access  owner
 * @body {channelId, adminId}
 */
router.post('/admin', addAdmin)

/**
 * @route   DELETE /api/channel/admin
 * @desc    Remove an admin from a channel
 * @access  owner
 * @body {channelId, adminId}
 */
router.delete('/admin', removeAdmin)

/**
 * @route   POST /api/channel/
 * @desc    Create a new channel
 * @access  private
 * @body {name} required
 * @body { username,image,info,} optional
 */
router.post('/', createChannel)

/**
 * @route   PUT /api/channel/:channelId
 * @desc    Update channel details by ID
 * @access  admin
 * @body {channelId}
 */
router.put('/', updateChannel)

/**
 * @route   DELETE /api/channel/:channelId
 * @desc    Delete a channel by ID
 * @param   channelId the id of the target channel
 * @access  owner
 */
router.delete('/', deleteChannel)

export default router
