import ERRORS from '../../../../config/_errors.js'
import {
   addAdminToChannel,
   createNewChannel,
   findChannelAndDelete,
   findChannelAndUpdate,
   removeAdminFromChannel,
} from './service.js'

export async function createChannel(req, res, next) {
   const channel = await createNewChannel(req.user.id, req.body)
   if (!channel) return next(ERRORS.SERVER_FAILED)

   res.status(201).json({ channel })
}

export async function updateChannel(req, res, next) {
   const channelId = req.body.channelId
   if (!channelId) return next(ERRORS.INVALID_CREDENTIAL)

   const channel = await findChannelAndUpdate(req.user.id, channelId, req.body)
   if (!channel) return next(ERRORS.UNAUTHORIZED)

   res.status(200).json({ channel })
}

export async function deleteChannel(req, res, next) {
   const channelId = req.body.channelId
   if (!channelId) return next(ERRORS.INVALID_CREDENTIAL)
   const channel = await findChannelAndDelete(req.user.id, channelId)
   if (!channel) return next(ERRORS.UNAUTHORIZED)

   res.sendStatus(204)
}
export async function addAdmin(req, res, next) {
   const { adminId, channelId } = req.body
   if (!adminId || !channelId) return next(ERRORS.BAD_REQUEST)

   const channel = await addAdminToChannel(req.userId, channelId, adminId)
   if (!channel) return next(ERRORS.FORBIDDEN)
   res.status(200).json({ channel })
}

export async function removeAdmin(req, res, next) {
   const { adminId, channelId } = req.body
   if (!adminId || !channelId) return next(ERRORS.BAD_REQUEST)

   const channel = await removeAdminFromChannel(req.userId, channelId, adminId)
   if (!channel) return next(ERRORS.FORBIDDEN)
   res.status(200).json({ channel })
}
