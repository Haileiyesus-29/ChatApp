import Group from '../../../models/group.model.js'
import User from '../../../models/user.model.js'

export const findSubscribedGroups = async userId => {
   const groups = await User.findById(userId)
      .select('groups')
      .populate('groups', 'name username image')
   return groups
}

export const findGroup = async id => {
   const group = await Group.findById(id).select('-admins -members')
   return group
}

export const addUserToGroup = async (userId, groupId) => {
   const group = await Group.findById(groupId)
   group.members.addToSet(userId)
   const newGroup = await group.save()

   if (newGroup)
      await User.findByIdAndUpdate(
         userId,
         {
            $addToSet: { groups: newGroup.id },
         },
         { new: true }
      )
   newGroup.members = undefined
   return newGroup
}

export const removeUserFromGroup = async (userId, groupId) => {
   const group = await Group.findById(groupId)
   group.members.pull(userId)
   const newGroup = await group.save()

   if (newGroup)
      await User.findByIdAndUpdate(
         userId,
         {
            $pull: { groups: newGroup.id },
         },
         { new: true }
      )

   newGroup.members = undefined
   return newGroup
}

export const getAllMembers = async groupId => {
   const members = await Group.findById(groupId)
      .select('members')
      .populate('members', 'name image')
   return members
}

export const getAllAdmins = async groupId => {
   const admins = await Group.findById(groupId)
      .select('admins')
      .populate('admins', 'name image')
   return admins
}
