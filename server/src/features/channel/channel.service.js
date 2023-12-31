import Channel from '../../models/channel.model.js'
import User from '../../models/user.model.js'

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

export const createNewChannel = async (userId, data) => {
   const { name, username, image, info } = data
   if (!name) return null
   const channel = new Channel({
      name,
      username,
      image,
      info,
      owner: userId,
      members: [userId],
   })
   const newChannel = await channel.save()
   if (newChannel)
      await User.findByIdAndUpdate(userId, {
         $addToSet: { channels: newChannel.id },
      })
   return newChannel
}

export const findChannelAndUpdate = async (userId, channelId, data) => {
   const { name, username, image, info } = data
   const update = { name, username, image, info }

   const updatedChannel = await Channel.findOneAndUpdate(
      {
         _id: channelId,
         $or: [{ owner: userId }, { admins: { $in: [userId] } }],
      },
      update,
      { new: true }
   ).select('-admins -members')
   return updatedChannel
}

export const findChannelAndDelete = async (userId, channelId) => {
   const channel = await Channel.findOneAndDelete({
      _id: channelId,
      owner: userId,
   })
   if (channel)
      await User.findByIdAndUpdate(userId, {
         $pull: { channels: channel.id },
      })
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

export const addAdminToChannel = async (userId, channelId, adminId) => {
   const channel = await Channel.findById(channelId)
   if (
      !channel ||
      channel.owner.toString() !== userId.toString() ||
      channel.members.some(member => member.toString() === adminId.toString())
   )
      return null
   channel.admins.push(adminId)
   const updatedChannel = await channel.save()
   return updatedChannel.admins
}

export const removeAdminFromChannel = async (userId, channelId, adminId) => {
   const channel = await Channel.findOneAndUpdate(
      { _id: channelId, owner: userId },
      {
         $pull: { admins: adminIdToRemove },
      },
      { new: true }
   )
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
