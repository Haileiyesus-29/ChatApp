import ERRORS from '../../../config/_errors.js'
import { chatToUserAccount, getChattedContacts } from './chat.service.js'

export async function getChats(req, res, next) {
   const chattedContacts = await getChattedContacts(req.user.id)
   if (!chattedContacts) return next(ERRORS.SERVER_FAILED)
   res.status(200).json({ contacts: chattedContacts })
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
   res.status(201).json(message)
}
