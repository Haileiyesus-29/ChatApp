import ERRORS from '../../../../config/_errors.js'
import {
   addUserToGroup,
   findGroup,
   findSubscribedGroups,
   getAllAdmins,
   getAllMembers,
   removeUserFromGroup,
} from './service.js'

export async function myGroups(req, res, next) {
   const groups = await findSubscribedGroups(req.user.id)
   res.status(200).json(groups?.groups)
}

export async function getGroup(req, res, next) {
   const groupId = req.params.groupId
   const group = await findGroup(groupId)
   if (!group) return next(ERRORS.NOT_FOUND)

   res.status(200).json({ group })
}

export async function joinGroup(req, res, next) {
   const groupId = req.body.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)
   const group = await addUserToGroup(req.user.id, groupId)
   if (!group) return next(ERRORS.SERVER_FAILED)

   res.status(200).json({ group })
}

export async function leaveGroup(req, res, next) {
   const groupId = req.body.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)
   const group = await removeUserFromGroup(req.user.id, groupId)
   if (!group) return next(ERRORS.NOT_FOUND)

   res.status(200).json({ group })
}

export async function getMembers(req, res, next) {
   const groupId = req.params.groupId
   if (!groupId) return next(ERRORS.BAD_REQUEST)
   const members = await getAllMembers(groupId)
   res.status(200).json({ members })
}

export async function getAdmins(req, res, next) {
   const groupId = req.params.groupId
   if (!groupId) return next(ERRORS.BAD_REQUEST)
   const admins = await getAllAdmins(groupId)
   res.status(200).json({ admins })
}
