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

   // const saveGroup = await User.findByIdAndUpdate(userId,{})

   return newGroup
}

export const findGroupAndUpdate = async (userId, groupId, data) => {
   const { name, username, image, info } = data
   const update = { name, username, image, info }

   const updatedGroup = await Group.findOneAndUpdate(
      {
         _id: groupId,
         $or: [{ owner: userId }, { admins: { $in: [userId] } }],
      },
      update,
      { new: true }
   ).select('-admins -members')
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
   const group = await Group.findOneAndUpdate(
      { _id: groupId, owner: userId },
      {
         $addToSet: { admins: adminId },
      },
      { new: true }
   )
   return group
}

export const removeAdminFromGroup = async (userId, groupId, adminId) => {
   const group = await Group.findOneAndUpdate(
      { _id: groupId, owner: userId },
      {
         $pull: { admins: adminId },
      },
      { new: true }
   )
   return group
}
