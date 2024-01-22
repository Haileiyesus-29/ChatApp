import ERRORS from '../../../../config/_errors.js'
import Group from '../../../models/group.model.js'
import User from '../../../models/user.model.js'

export const findSubscribedGroups = async user => {
   const groups = await User.findById(user.id)
      .select('groups')
      .populate('groups', 'name username image')
   if (!groups) return ERRORS.SERVER_FAILED
   return { data: groups }
}

export const findGroup = async id => {
   const group = await Group.findById(id).select('-admins -members')
   if (!group) return ERRORS.NOT_FOUND

   return { data: group }
}

export const addUserToGroup = async (user, data) => {
   const { groupId } = data
   if (!groupId) return ERRORS.INVALID_CREDENTIAL

   const group = await Group.findById(groupId)
   if (!group) return ERRORS.NOT_FOUND

   group.members.addToSet(user.id)
   const newGroup = await group.save()
   if (!newGroup) return ERRORS.SERVER_FAILED

   user.groups.addToSet(newGroup.id)
   await user.save()

   newGroup.members = undefined
   return { data: newGroup }
}

export const removeUserFromGroup = async (user, data) => {
   const { groupId } = data
   if (!groupId) return ERRORS.BAD_REQUEST

   const group = await Group.findById(groupId)

   group.members.pull(user.id)
   const updated = await group.save()

   if (!updated) return ERRORS.SERVER_FAILED

   user.groups.pull(updated.id)
   await user.save()

   updated.members = undefined
   return { data: updated }
}

export const getAllMembers = async groupId => {
   const members = await Group.findById(groupId)
      .select('members')
      .populate('members', 'name image')
   return { data: members }
}

export const getAllAdmins = async groupId => {
   const admins = await Group.findById(groupId)
      .select('admins')
      .populate('admins', 'name image')
   return { data: admins }
}
