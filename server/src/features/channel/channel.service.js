import Channel from '../../models/channel.model.js'

export const findChannel = async id => {
   const channel = await Channel.findById(id).select('-admins -members')
   return channel
}

export const createNewChannel = async (userId, data) => {
   const { name, username, image, info } = data
   const channel = new Channel({
      name,
      username,
      image,
      info,
      owner: userId,
      members: [userId],
   })
   const newChannel = await channel.save()
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
   return channel
}

export const addUserToChannel = async (userId, channelId) => {
   const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $addToSet: { members: userId } },
      { new: true }
   ).select('name username members')
   return channel
}
export const remmoveUserFromChannel = async (userId, channelId) => {
   const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $pull: { members: userId } },
      { new: true }
   ).select('name username members')
   return channel
}

export const addAdminToChannel = async (userId, channelId, adminId) => {
   const channel = await Channel.findOneAndUpdate(
      { _id: channelId, owner: userId },
      {
         $addToSet: { admins: adminId },
      },
      { new: true }
   )
   return channel
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
