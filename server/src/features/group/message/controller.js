import ERRORS from '../../../../config/_errors.js'
import {
   findGroupMessages,
   getSubscribedGroupsLastMessages,
   sendGroupMessage,
} from './service.js'

export async function sendMessage(req, res, next) {
   const { receiverId: groupId, message } = req.body
   if (!groupId || !message) return next(ERRORS.INVALID_CREDENTIAL)
   const newMessage = await sendGroupMessage(req.user, groupId, message)

   res.status(201).json(newMessage)
}

export async function getMesssages(req, res, next) {
   const groupId = req.params.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)
   const messages = await findGroupMessages(groupId)
   res.status(200).json(messages)
}

export async function getGroupsWithLastMessages(req, res, next) {
   const groups = await getSubscribedGroupsLastMessages(req.user)
   res.status(200).json(groups)
}