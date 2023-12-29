import Channel from '../../models/channel.model.js'

export const findChannel = async id => {
   const channel = await Channel.findById(id).select('-admins -members')
   return channel
}

export const createNewChannel = async (data, userId) => {
   const { name, username, image, info } = data
   const channel = new Channel({ name, username, image, info, owner: userId })
   const newChannel = await channel.save()
   return newChannel
}

export const findChannelAndUpdate = async (data, userId, channelId) => {
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
