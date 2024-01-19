import RESPONSE from '../../../../config/_response.js'
import {
   addAdminToGroup,
   createNewGroup,
   findGroupAndDelete,
   findGroupAndUpdate,
   removeAdminFromGroup,
} from './service.js'

export async function addAdmin(req, res, next) {
   const { error, data } = await addAdminToGroup(req.user, req.body)
   if (error) return next(RESPONSE.error(error))
   res.status(200).json(RESPONSE.success({ group: data }))
}

export async function removeAdmin(req, res, next) {
   const { error, data } = await removeAdminFromGroup(req.user, req.body)
   if (error) return next(RESPONSE.error(error))
   res.status(200).json(RESPONSE.success({ group: data }))
}

export async function createGroup(req, res, next) {
   const { error, data } = await createNewGroup(req.user, req.body)
   if (error) return next(RESPONSE.error(error))
   res.status(201).json(RESPONSE.success({ group: data }))
}

export async function deleteGroup(req, res, next) {
   const { error, data } = await findGroupAndDelete(req.user, req.body)
   if (error) return next(RESPONSE.error(error))
   res.sendStatus(204)
}

export async function updateGroup(req, res, next) {
   const { error, data } = await findGroupAndUpdate(req.user, req.body)
   if (error) return next(RESPONSE.error(error))
   res.status(200).json(RESPONSE.success({ group: data }))
}
