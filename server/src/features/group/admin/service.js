import Group from '../../../models/group.model.js'
import User from '../../../models/user.model.js'

export const createNewGroup = async (userId, data) => {
   const { name, username, image, info } = data
   const group = new Group({
      name,
      username,
      image,
      info,
      owner: userId,
      members: [userId],
   })
   const newGroup = await group.save()

   if (newGroup)
      await User.findByIdAndUpdate(userId, {
         $addToSet: { groups: newGroup.id },
      })

   return newGroup
}

export const findGroupAndUpdate = async (userId, groupId, data) => {
   const { name, username, image, info } = data
   const update = { name, username, image, info }

   const group = await Group.findById(groupId)
   if (!group) return null

   if (!(group.owner.equals(userId) || group.admins.includes(userId)))
      return null

   Object.assign(group, update)
   const updatedGroup = await group.save()
   updatedGroup.members = undefined
   return updatedGroup
}

export const findGroupAndDelete = async (userId, groupId) => {
   const group = await Group.findOneAndDelete({
      _id: groupId,
      owner: userId,
   })
   return group
}

export const addAdminToGroup = async (userId, groupId, adminId) => {
   const group = await Group.findById(groupId)
   if (!group) return null
   if (!group.owner.equals(userId)) return null

   group.admins.addToSet(adminId)
   const updatedGroup = await group.save()

   updatedGroup.members = undefined
   return updatedGroup
}

export const removeAdminFromGroup = async (userId, groupId, adminId) => {
   const group = await Group.findById(groupId)
   if (!group) return null
   if (!group.owner.equals(userId)) return null

   group.admins.pull(userId)
   const updatedGroup = await group.save()

   updatedGroup.members = undefined
   return updatedGroup
}
