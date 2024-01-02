import Message from '../../models/message.model.js'
import User from '../../models/user.model.js'

export const chatToUserAccount = async (userId, receiverId, payload) => {
   const { images, text } = payload
   if (!images.length && !text) return null

   const content = images.length ? 'image' : 'text'

   const receiver = await User.findById(receiverId)
   if (!receiverId) return null

   const message = new Message({
      sender: userId,
      receiver: receiverId,
      chatType: 'message',
      content,
      images,
      text,
   })
   const sentMessage = await message.save()
}

export const getChattedContacts = async userId => {
   const receivers = await Message.aggregate([
      {
         $match: { sender: userId },
      },
      {
         $group: {
            _id: '$receiver',
            lastMessageTime: { $max: '$createdAt' },
         },
      },
      {
         $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'contact',
         },
      },
      {
         $project: {
            _id: '$contact._id',
            fname: '$contact.fname',
            lname: '$contact.lname',
            username: '$contact.username',
            image: '$contact.image',
            lastMessageTime: 1,
         },
      },
   ])

   const senders = await Message.aggregate([
      {
         $match: { receiver: userId },
      },
      {
         $group: {
            _id: '$sender',
            lastMessageTime: { $max: '$createdAt' },
         },
      },
      {
         $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'contact',
         },
      },
      {
         $project: {
            _id: '$contact._id',
            fname: '$contact.fname',
            lname: '$contact.lname',
            username: '$contact.username',
            image: '$contact.image',
            lastMessageTime: 1,
         },
      },
   ])

   const chattedContacts = [...receivers, ...senders]

   chattedContacts.sort((a, b) => b.lastMessageTime - a.lastMessageTime)

   return chattedContacts
}
