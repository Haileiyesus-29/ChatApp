import Channel from '../../../models/channel.model.js'
import Post from '../../../models/post.model.js'

export const createNewPost = async (userId, channelId, message) => {
   const { text, images } = message
   if (!text && !images?.length) return null

   const channel = await Channel.findById(channelId).select('admins owner')
   if (
      !channel?.owner.toString() === userId &&
      !channel?.admins.some(admin => admin.toString() === userId)
   )
      return null
   const post = new Post({
      channel: channelId,
      text,
      images,
   })
   const newPost = await post.save()
   return newPost
}
