import ERRORS from '../../../../config/_errors.js'
import Channel from '../../../models/channel.model.js'
import User from '../../../models/user.model.js'

export const createNewChannel = async (user, data) => {
   const { name, username, image, info } = data
   if (!name) return ERRORS.INVALID_CREDENTIAL
   const channel = new Channel({
      name,
      username,
      image,
      info,
      owner: user.id,
      members: [user.id],
   })
   const newChannel = await channel.save()

   if (!newChannel) return ERRORS.SERVER_FAILED
   await User.findByIdAndUpdate(user.id, {
      $addToSet: { channels: newChannel.id },
   })
   return { channel: newChannel }
}

export const findChannelAndUpdate = async (user, data) => {
   const { name, username, image, info, channelId } = data
   const update = { name, username, image, info }

   if (!channelId) return ERRORS.INVALID_CREDENTIAL

   const channel = await Channel.findById(channelId)
   if (!channel) return ERRORS.BAD_REQUEST

   if (!(channel.owner.equals(user.id) || channel.admins.includes(user.id))) {
      return ERRORS.FORBIDDEN
   }

   Object.assign(channel, update)
   const updatedChannel = await channel.save()
   if (!updatedChannel) return ERRORS.SERVER_FAILED

   updatedChannel.members = undefined
   return { channel: updatedChannel }
}

export const findChannelAndDelete = async (user, data) => {
   if (!data?.channelId) return ERRORS.INVALID_CREDENTIAL

   const channel = await Channel.findById(data.channelId)
   if (!channel || !channel.owner.equals(user.id)) return ERRORS.FORBIDDEN

   await User.updateMany(
      { _id: { $in: channel.members } },
      { $pull: { channels: channel.id } }
   )
   await Channel.findByIdAndDelete(data.channelId)

   return { channel }
}

export const addAdminToChannel = async (user, data) => {
   const { adminId, channelId } = data
   if (!adminId || !channelId) return ERRORS.INVALID_CREDENTIAL

   const channel = await Channel.findById(channelId)

   if (!channel) return ERRORS.BAD_REQUEST

   if (!channel.owner.equals(user.id)) return ERRORS.FORBIDDEN

   if (!channel.members.includes(adminId)) return ERRORS.BAD_REQUEST

   channel.admins.addToSet(adminId)
   const updatedChannel = await channel.save()
   if (!updatedChannel) return ERRORS.SERVER_FAILED

   updatedChannel.members = undefined
   return updatedChannel
}

export const removeAdminFromChannel = async (user, data) => {
   const { adminId, channelId } = data
   if (!adminId || !channelId) return ERRORS.INVALID_CREDENTIAL

   const channel = await Channel.findById(channelId)

   if (!channel) return ERRORS.BAD_REQUEST

   if (!channel.owner.equals(user.id)) return ERRORS.FORBIDDEN

   channel.admins.pull(adminId)

   const updatedChannel = await channel.save()
   if (!updatedChannel) return ERRORS.SERVER_FAILED

   updatedChannel.members = undefined

   return updatedChannel
}
