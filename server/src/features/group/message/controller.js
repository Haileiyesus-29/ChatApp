import RESPONSE from '../../../../config/_response.js'
import {
   findGroupMessages,
   getSubscribedGroupsLastMessages,
   sendGroupMessage,
} from './service.js'

export async function sendMessage(req, res, next) {
   const { error, message } = await sendGroupMessage(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   req.io.emit(`group-${message.receiver}`, message, message.receiver)
   res.status(201).json(RESPONSE.success(message, 201))
}

export async function getMesssages(req, res, next) {
   const { error, messages } = await findGroupMessages(req.params.groupId)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(messages, 200))
}

export async function getGroupsWithLastMessages(req, res, next) {
   const { error, groups } = await getSubscribedGroupsLastMessages(req.user)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(groups, 200))
}
