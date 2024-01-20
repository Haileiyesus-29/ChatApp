import { Router } from 'express'
import {
   getGroupsWithLastMessages,
   getMesssages,
   sendMessage,
} from './controller.js'
const route = Router()

/**
 * @route   GET /api/group/chatlist
 * @desc    Get subscribed group lists with their last message
 * @access  private
 */
route.get('/chatlist', getGroupsWithLastMessages)

/**
 * @route   GET /api/message/:groupId
 * @desc    Get the messages sent to the group
 * @param   groupId the id of the target group
 * @access  private
 */
route.get('/message/:groupId', getMesssages)

/**
 * @route   POST /api/message
 * @desc    Send message to the group
 * @body   {groupId, text, images}
 * @access  private
 */
route.post('/message', sendMessage)

export default route
