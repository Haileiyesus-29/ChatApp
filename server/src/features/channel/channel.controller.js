import ERRORS from '../../../config/_errors.js'
import {
   createNewChannel,
   findChannel,
   findChannelAndDelete,
   findChannelAndUpdate,
} from './channel.service.js'

export async function getChannel(req, res, next) {
   const channelId = req.params.channelId
   const channel = await findChannel(channelId)
   if (!channel) return next(ERRORS.NOT_FOUND)

   res.status(200).json({ channel })
}

export async function createChannel(req, res, next) {
   const channel = await createNewChannel(req.body, req.user.id)
   if (!channel) return next(ERRORS.SERVER_FAILED)

   res.status(201).json({ channel })
}

export async function updateChannel(req, res, next) {
   const channelId = req.params.channelId
   if (!channelId) return next(ERRORS.INVALID_CREDIENTIAL)

   const channel = await findChannelAndUpdate(req.body, req.user.id, channelId)
   if (!channel) return next(ERRORS.UNAUTHORISED)

   res.status(200).json({ channel })
}

export async function deleteChannel(req, res, next) {
   const channelId = req.params.channelId
   if (!channelId) return next(ERRORS.INVALID_CREDIENTIAL)
   const channel = await findChannelAndDelete(req.user.id, channelId)
   if (!channel) return next(ERRORS.UNAUTHORISED)

   res.sendStatus(204)
}
