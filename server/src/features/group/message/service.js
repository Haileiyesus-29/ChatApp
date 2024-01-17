import Message from '../../../models/message.model.js'
import User from '../../../models/user.model.js'

export const sendGroupMessage = async (userId, groupId, payload) => {
   const { text, images } = payload
   if (!(text || images?.length)) return null

   const message = new Message({
      text,
      images,
      sender: userId,
      receiver: groupId,
      chatType: 'Group',
   })
   const newMessage = await message.save()
   return newMessage
}

export const findGroupMessages = async groupId => {
   const messages = await Message.find({ receiver: groupId })
      .populate('sender', 'image fname lname')
      .populate('receiver', 'name image')
      .sort({ createdAt: -1 })
   return messages
}
export const getSubscribedGroupsLastMessages = async userId => {
   if (!userId) return null
   const groupIds = await User.findById(userId).select('groups')

   const lastMessages = await Message.aggregate([
      { $match: { receiver: { $in: groupIds } } },
      {
         $lookup: {
            from: 'groups', // Replace 'groups' with your actual group collection name
            localField: 'lastMessage.receiver',
            foreignField: '_id',
            as: 'lastMessage.receiverInfo',
         },
      },
      { $unwind: '$lastMessage.senderInfo' },
      { $unwind: '$lastMessage.receiverInfo' },
   ])

   return lastMessages
}
