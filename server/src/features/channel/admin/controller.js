import ERRORS from '../../../../config/_errors.js'
import RESPONSE from '../../../../config/_response.js'
import {
   addAdminToChannel,
   createNewChannel,
   findChannelAndDelete,
   findChannelAndUpdate,
   removeAdminFromChannel,
} from './service.js'

export async function createChannel(req, res, next) {
   const { error, channel } = await createNewChannel(req.user, req.body)
   if (error) return next(RESPONSE.error(error))
   res.status(201).json(RESPONSE.success(channel, 201))
}

export async function updateChannel(req, res, next) {
   const { error, channel } = await findChannelAndUpdate(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(channel, 200))
}

export async function deleteChannel(req, res, next) {
   const { error } = await findChannelAndDelete(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.sendStatus(204)
}
export async function addAdmin(req, res, next) {
   const { error, channel } = await addAdminToChannel(req.user, req.body)
   if (error) return next(RESPONSE.error(error))
   res.status(201).json(RESPONSE.success(channel, 201))
}

export async function removeAdmin(req, res, next) {
   const { error, channel } = await removeAdminFromChannel(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(channel, 200))
}
