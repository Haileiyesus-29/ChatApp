import ERRORS from '../../../config/_errors.js'
import {
   chatToUserAccount,
   getChatThread,
   getChattedContacts,
} from './chat.service.js'

export async function getContacts(req, res, next) {
   const chattedContacts = await getChattedContacts(req.user.id)
   if (!chattedContacts) return next(ERRORS.SERVER_FAILED)
   res.status(200).json(chattedContacts)
}

export async function sendMessage(req, res, next) {
   const receiverId = req.body.receiverId
   if (!receiverId) return next(ERRORS.INVALID_CREDENTIAL)
   const message = await chatToUserAccount(
      req.user.id,
      receiverId,
      req.body.message
   )
   if (!message) return next(ERRORS.BAD_REQUEST)
   req.io.emit(`chat-${receiverId}`, message, req.user.id)
   res.status(201).json(message)
}

export async function getChatMessages(req, res, next) {
   const contactId = req.params.contactId
   if (!contactId) return next(ERRORS.INVALID_CREDENTIAL)
   const messages = await getChatThread(req.user.id, contactId)
   res.status(200).json(messages)
}
