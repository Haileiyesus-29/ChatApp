import ERRORS from '../../../../config/_errors.js'
import RESPONSE from '../../../../config/_response.js'
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
   const { error, channels } = await getUserJoinedChannels(req.user)
   if (error) return next(RESPONSE.error(error))
   res.status(200).json(RESPONSE.success(channels, 200))
}
export async function getChannel(req, res, next) {
   const { error, channel } = await findChannel(req.params)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(channel, 200))
}

export async function joinChannel(req, res, next) {
   const { error, channel } = await addUserToChannel(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(201).json(RESPONSE.success(channel, 201))
}

export async function leaveChannel(req, res, next) {
   const { error, channel } = await remmoveUserFromChannel(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(201).json(RESPONSE.success(channel, 201))
}

export async function getMembers(req, res, next) {
   const { error, members } = await getAllMembers(req.params.channelId)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(members, 200))
}

export async function getAdmins(req, res, next) {
   const { error, admins } = await getAllAdmins(req.params.channelId)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(admins, 200))
}

export async function myChannels(req, res, next) {
   const { error, channels } = await getUserChannels(req.user)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(channels, 200))
}
