import Group from '../../../models/group.model.js'
import User from '../../../models/user.model.js'
import ERRORS from '../../../../config/_errors.js'

export const createNewGroup = async (user, data) => {
   const { name, username, image, info } = data
   if (!name) return ERRORS.INVALID_CREDENTIAL

   const group = new Group({
      name,
      username:
         username ||
         `group_${Math.floor(Math.random() * 1000)}` +
            `${Math.floor(Math.random() * 10000)}`,
      image,
      info,
      owner: user.id,
      members: [user.id],
   })
   const newGroup = await group.save()

   if (!newGroup) return ERRORS.SERVER_FAILED

   user.groups.addToSet(newGroup.id)
   await user.save()

   return { data: newGroup }
}

export const findGroupAndUpdate = async (user, data) => {
   const { groupId, name, username, image, info } = data
   const update = { name, username, image, info }

   const group = await Group.findById(groupId)
   if (!group) return ERRORS.NOT_FOUND

   if (!(group.owner.equals(user.id) || group.admins.includes(user.id)))
      return ERRORS.FORBIDDEN

   Object.assign(group, update)
   const updatedGroup = await group.save()

   if (!updatedGroup) return ERRORS.SERVER_FAILED

   updatedGroup.members = undefined
   return { data: updatedGroup }
}

export const findGroupAndDelete = async (user, data) => {
   const { groupId } = data
   if (!groupId) return ERRORS.INVALID_CREDENTIAL

   const group = await Group.findOneAndDelete({ _id: groupId, owner: user.id })
   return { data: group }
}

export const addAdminToGroup = async (user, data) => {
   const { groupId, adminId } = data
   if (!groupId || !adminId) return ERRORS.INVALID_CREDENTIAL

   const group = await Group.findById(groupId)

   if (!group) return ERRORS.NOT_FOUND
   if (!group.owner.equals(user.id)) return ERRORS.FORBIDDEN

   group.admins.addToSet(adminId)
   const updatedGroup = await group.save()

   updatedGroup.members = undefined
   return { data: updatedGroup }
}

export const removeAdminFromGroup = async (user, data) => {
   const { groupId, adminId } = data
   if (!groupId || !adminId) return ERRORS.INVALID_CREDENTIAL

   const group = await Group.findById(groupId)
   if (!group) return ERRORS.NOT_FOUND
   if (!group.owner.equals(user.id)) return ERRORS.FORBIDDEN

   group.admins.pull(adminId)
   const updatedGroup = await group.save()

   updatedGroup.members = undefined
   return { data: updatedGroup }
}
