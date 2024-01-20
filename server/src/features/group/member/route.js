import { Router } from 'express'
import {
   getGroup,
   getMembers,
   joinGroup,
   leaveGroup,
   myGroups,
} from './controller.js'

const router = Router()

/**
 * @route   GET /api/group
 * @desc    Get a list of groups created by a user
 * @access  private
 */
router.get('/', myGroups)

/**
 * @route   GET /api/group/:groupId
 * @desc    Get group info by group id
 * @param   groupId -- the id of the target group
 * @access  private
 */
router.get('/:groupId', getGroup)

/**
 * @route   GET /api/group/members/:groupId
 * @desc    Get subscribed members list
 * @param   groupId -- the id of the
 * @access  private
 */
router.get('/members/:groupId', getMembers)

/**
 * @route   POST /api/group/join
 * @desc    Subscribe to group
 * @body   {groupId}
 * @access  private
 */
router.post('/join', joinGroup)

/**
 * @route   POST /api/group/leave
 * @desc    Unsubscribe from a group
 * @body   {channelId, groupId}
 * @access  private
 */
router.post('/leave', leaveGroup)

export default router
