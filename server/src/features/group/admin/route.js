import { Router } from 'express'
import {
   addAdmin,
   createGroup,
   deleteGroup,
   removeAdmin,
   updateGroup,
} from './controller.js'
const router = Router()

/**
 * @route   POST /api/group/admin
 * @desc    Add admin to the group
 * @body   {channelId, groupId}
 * @access  owner
 */
router.post('/admin', addAdmin)

/**
 * @route   DELETE /api/group/admin
 * @desc    Remove admin from the group
 * @body   {channelId, groupId}
 * @access  owner
 */
router.delete('/admin', removeAdmin)

/**
 * @route   POST /api/group
 * @desc    Create new group
 * @body   {name, image, username, info}
 * @access  owner
 */
router.post('/', createGroup)

/**
 * @route   PUT /api/group
 * @desc    Update group info
 * @body   { groupId, name, image, info, username}
 * @access  admin
 */
router.put('/', updateGroup)

/**
 * @route   DELETE /api/group
 * @desc    Delete group
 * @body   {groupId}
 * @access  owner
 */
router.delete('/', deleteGroup)

export default router
