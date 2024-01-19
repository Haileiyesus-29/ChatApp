import RESPONSE from '../../../../config/_response.js'
import {
   addUserToGroup,
   findGroup,
   findSubscribedGroups,
   getAllAdmins,
   getAllMembers,
   removeUserFromGroup,
} from './service.js'

export async function myGroups(req, res, next) {
   const { error, data } = await findSubscribedGroups(req.user)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(data, 200))
}

export async function getGroup(req, res, next) {
   const { error, data } = await findGroup(req.params.groupId)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(data, 200))
}

export async function joinGroup(req, res, next) {
   const { error, data } = await addUserToGroup(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(201).json(RESPONSE.success(data, 201))
}

export async function leaveGroup(req, res, next) {
   const { error, data } = await removeUserFromGroup(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(data, 200))
}

export async function getMembers(req, res, next) {
   const { error, data } = await getAllMembers(req.params.groupId)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(data, 200))
}

export async function getAdmins(req, res, next) {
   const { error, data } = await getAllAdmins(req.params.groupId)
   if (error) return next(RESPONSE.error(error))
   res.status(200).json(RESPONSE.success(data, 200))
}
