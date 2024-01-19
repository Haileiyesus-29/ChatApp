import ERRORS from '../../../../config/_errors.js'
import Channel from '../../../models/channel.model.js'
import Post from '../../../models/post.model.js'

export const createNewPost = async (user, data) => {
   const { text, images, channelId } = data

   if (!channelId || !(text || images?.length)) return ERRORS.INVALID_CREDENTIAL

   const channel = await Channel.findById(channelId)
   if (!channel.owner.equals(user.id) || !channel.admins.includes(user.id))
      return ERRORS.FORBIDDEN

   const post = new Post({
      channel: channelId,
      text,
      images,
   })

   const newPost = await post.save()
   if (!newPost) return ERRORS.SERVER_FAILED
   return { post: newPost }
}
