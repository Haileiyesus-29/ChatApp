import ERRORS from '../../../../config/_errors.js'
import Channel from '../../../models/channel.model.js'
import User from '../../../models/user.model.js'

export const getUserJoinedChannels = async user => {
   const channels = await User.findById(user.id)
      .select('channels')
      .populate('channels', 'name image')
   return channels
}

export const findChannel = async groupId => {
   const channel = await Channel.findById(groupId).select('-admins -members')
   if (!channel) return ERRORS.NOT_FOUND
   return { channel }
}

export const addUserToChannel = async (user, data) => {
   const { channelId } = data
   if (!channelId) return ERRORS.INVALID_CREDENTIAL

   const channel = await Channel.findById(channelId)
   if (!channel) return ERRORS.NOT_FOUND

   channel.members.addToSet(user.id)

   const updated = await channel.save()
   if (!updated) return ERRORS.SERVER_FAILED

   user.channels.addToSet(channelId)
   await user.save

   return { channel: updated }
}

export const remmoveUserFromChannel = async (user, data) => {
   const { channelId } = data
   if (!channelId) return ERRORS.INVALID_CREDENTIAL

   const channel = await Channel.findById(channelId)
   if (!channel) return ERRORS.NOT_FOUND

   channel.members.pull(user.id)

   const updated = await channel.save()
   if (!updated) return ERRORS.SERVER_FAILED

   user.channels.pull(channelId)
   await user.save

   return { channel: updated }
}

export const getAllMembers = async channelId => {
   if (!channelId) return ERRORS.INVALID_CREDENTIAL
   const members = await Channel.findById(channelId)
      .select('members')
      .populate('members', 'name image')
   return { members }
}

export const getAllAdmins = async channelId => {
   if (!channelId) return ERRORS.INVALID_CREDENTIAL
   const admins = await Channel.findById(channelId)
      .select('admins')
      .populate('admins', 'name image')
   return { admins }
}

export const getUserChannels = async userId => {
   const channels = await Channel.find({ owner: userId }).select('name image')
   return channels
}
