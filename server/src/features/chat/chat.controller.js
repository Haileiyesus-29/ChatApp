import ERRORS from '../../../config/_errors.js'
import { getChattedContacts } from './chat.service.js'

export async function getChats(req, res, next) {
   const chattedContacts = await getChattedContacts(req.user.id)
   if (!chattedContacts) return next(ERRORS.SERVER_FAILED)
   res.status(200).json({ contacts: chattedContacts })
}
