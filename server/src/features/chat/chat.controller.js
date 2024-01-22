import RESPONSE from '../../../config/_response.js'
import {
   chatToUserAccount,
   getChatThread,
   getChattedContacts,
} from './chat.service.js'

export async function getContacts(req, res, next) {
   const { error, contacts } = await getChattedContacts(req.user)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(contacts, 200))
}

export async function sendMessage(req, res, next) {
   const { error, message } = await chatToUserAccount(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   req.io.emit(`chat-${message.receiver}`, message, req.user.id)
   res.status(201).json(RESPONSE.success(message, 201))
}

export async function getChatMessages(req, res, next) {
   const { error, messages } = await getChatThread(
      req.user,
      req.params.contactId
   )
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(messages, 200))
}
