import ERRORS from '../../../../config/_errors.js'
import {
   addUserToChannel,
   findChannel,
   getAllAdmins,
   getAllMembers,
   getUserChannels,
   getUserJoinedChannels,
   remmoveUserFromChannel,
} from './service.js'

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
