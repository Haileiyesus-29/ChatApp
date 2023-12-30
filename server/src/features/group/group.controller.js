import ERRORS from '../../../config/_errors.js'
import {
   addAdminToGroup,
   findGroup,
   findGroupAndDelete,
   findGroupAndUpdate,
   getAllAdmins,
   getAllMembers,
   removeAdminFromGroup,
   addUserToGroup,
   removeUserFromGroup,
} from './group.service.js'

export async function getGroup(req, res, next) {
   const groupId = req.params.groupId
   const group = await findGroup(groupId)
   if (!group) return next(ERRORS.NOT_FOUND)

   res.status(200).json({ group })
}

export async function createGroup(req, res, next) {
   const group = await createNewGroup(req.user.id, req.body)
   if (!group) return next(ERRORS.SERVER_FAILED)

   res.status(201).json({ group })
}

export async function updateGroup(req, res, next) {
   const groupId = req.params.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)

   const group = await findGroupAndUpdate(req.user.id, groupId, req.body)
   if (!group) return next(ERRORS.UNAUTHORIZED)

   res.status(200).json({ group })
}

export async function deleteGroup(req, res, next) {
   const groupId = req.body.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)
   const group = await findGroupAndDelete(req.user.id, groupId)
   if (!group) return next(ERRORS.UNAUTHORIZED)

   res.sendStatus(204)
}

export async function joinGroup(req, res, next) {
   const groupId = req.params.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)
   const group = await addUserToGroup(req.userId, groupId)
   if (!group) return next(ERRORS.SERVER_FAILED)

   res.status(200).json({ group })
}

export async function leaveGroup(req, res, next) {
   const groupId = req.body.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)
   const group = await removeUserFromGroup(req.userId, groupId)
   if (!group) return next(ERRORS.NOT_FOUND)

   res.status(200).json({ group })
}

export async function addAdmin(req, res, next) {
   const { adminId, groupId } = req.body
   if (!adminId || !groupId) return next(ERRORS.BAD_REQUEST)

   const group = await addAdminToGroup(req.userId, groupId, adminId)
   if (!group) return next(ERRORS.FORBIDDEN)
   res.status(200).json({ group })
}

export async function removeAdmin(req, res, next) {
   const { adminId, groupId } = req.body
   if (!adminId || !groupId) return next(ERRORS.BAD_REQUEST)

   const group = await removeAdminFromGroup(req.userId, groupId, adminId)
   if (!group) return next(ERRORS.FORBIDDEN)
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
