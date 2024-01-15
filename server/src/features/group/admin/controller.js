import ERRORS from '../../../../config/_errors.js'
import {
   addAdminToGroup,
   createNewGroup,
   findGroupAndDelete,
   findGroupAndUpdate,
   removeAdminFromGroup,
} from './service'

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

export async function createGroup(req, res, next) {
   const data = req.body
   if (!data.name) return next(ERRORS.BAD_REQUEST)
   const group = await createNewGroup(req.user.id, data)
   if (!group) return next(ERRORS.SERVER_FAILED)

   res.status(201).json({ group })
}
export async function deleteGroup(req, res, next) {
   const groupId = req.body.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)
   const group = await findGroupAndDelete(req.user.id, groupId)
   if (!group) return next(ERRORS.UNAUTHORIZED)

   res.sendStatus(204)
}

export async function updateGroup(req, res, next) {
   const groupId = req.params.groupId
   if (!groupId) return next(ERRORS.INVALID_CREDENTIAL)

   const group = await findGroupAndUpdate(req.user.id, groupId, req.body)
   if (!group) return next(ERRORS.UNAUTHORIZED)

   res.status(200).json({ group })
}
