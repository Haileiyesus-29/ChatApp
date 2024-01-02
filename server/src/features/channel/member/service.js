import Channel from '../../../models/channel.model.js'
import User from '../../../models/user.model.js'

export const getUserJoinedChannels = async userId => {
   const channels = await User.findById(userId)
      .select('channels')
      .populate('name image')
   return channels
}

export const findChannel = async id => {
   const channel = await Channel.findById(id).select('-admins -members')
   return channel
}

export const addUserToChannel = async (userId, channelId) => {
   const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $addToSet: { members: userId } },
      { new: true }
   ).select('name username members')
   if (channel)
      await User.findByIdAndUpdate(userId, {
         $addToSet: { channels: channel.id },
      })
   return channel
}
export const remmoveUserFromChannel = async (userId, channelId) => {
   const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $pull: { members: userId }, $pull: { admins: userId } },
      { new: true }
   ).select('name username members')
   if (channel)
      await User.findByIdAndUpdate(userId, {
         $pull: { channels: channel.id },
      })
   return channel
}

export const getAllMembers = async channelId => {
   const members = await Channel.findById(channelId)
      .select('members')
      .populate('members', 'name image')
   return members
}
export const getAllAdmins = async channelId => {
   const members = await Channel.findById(channelId)
      .select('admins')
      .populate('admins', 'name image')
   return members
}

export const getUserChannels = async userId => {
   const channels = await Channel.find({ owner: userId }).select('name image')
   return channels
}
