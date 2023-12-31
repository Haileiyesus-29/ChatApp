import ERRORS from '../../../config/_errors.js'
import {
   addAdminToChannel,
   createNewChannel,
   findChannel,
   findChannelAndDelete,
   findChannelAndUpdate,
   getAllAdmins,
   getAllMembers,
   removeAdminFromChannel,
   addUserToChannel,
   remmoveUserFromChannel,
   getUserChannels,
   getUserJoinedChannels,
} from './channel.service.js'

export async function getJoinedChannels(req, res, next) {
   const channels = await getUserJoinedChannels(req.user.id)
   res.status(200).json({ channels })
}
export async function getChannel(req, res, next) {
   const channelId = req.params.channelId
   const channel = await findChannel(channelId)
   if (!channel) return next(ERRORS.NOT_FOUND)

   res.status(200).json({ channel })
}

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

export async function joinChannel(req, res, next) {
   const channelId = req.params.channelId
   if (!channelId) return next(ERRORS.INVALID_CREDENTIAL)
   const channel = await addUserToChannel(req.userId, channelId)
   if (!channel) return next(ERRORS.SERVER_FAILED)

   res.status(200).json({ channel })
}

export async function leaveChannel(req, res, next) {
   const channelId = req.body.channelId
   if (!channelId) return next(ERRORS.INVALID_CREDENTIAL)
   const channel = await remmoveUserFromChannel(req.userId, channelId)
   if (!channel) return next(ERRORS.NOT_FOUND)

   res.status(200).json({ channel })
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

export async function getMembers(req, res, next) {
   const channelId = req.params.channelId
   if (!channelId) return next(ERRORS.BAD_REQUEST)
   const members = await getAllMembers(channelId)
   res.status(200).json({ members })
}

export async function getAdmins(req, res, next) {
   const channelId = req.params.channelId
   if (!channelId) return next(ERRORS.BAD_REQUEST)
   const admins = await getAllAdmins(channelId)
   res.status(200).json({ admins })
}

export async function myChannels(req, res, next) {
   const channels = await getUserChannels(req.user.id)
   res.status(200).json({ channels })
}
