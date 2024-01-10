import mongoose from 'mongoose'
import Message from '../../models/message.model.js'
import User from '../../models/user.model.js'

export const chatToUserAccount = async (userId, receiverId, payload) => {
   const { images, text } = payload
   if (!images?.length && !text) return null

   const content = images?.length ? 'image' : 'text'

   const receiver = await User.findById(receiverId)
   if (!receiver.id) return null

   const message = new Message({
      sender: userId,
      receiver: receiverId,
      chatType: 'User',
      content,
      images,
      text,
   })
   const sentMessage = await message.save()
   return sentMessage
}

export const getChattedContacts = async userId => {
   const lastMessages = await Message.aggregate([
      {
         $match: {
            $or: [
               { sender: new mongoose.Types.ObjectId(userId) },
               { receiver: new mongoose.Types.ObjectId(userId) },
            ],
         },
      },
      {
         $group: {
            _id: {
               $cond: [
                  { $eq: ['$sender', new mongoose.Types.ObjectId(userId)] },
                  '$receiver',
                  '$sender',
               ],
            },
            lastMessageTime: { $max: '$createdAt' },
            lastMessage: { $last: '$$ROOT' },
         },
      },
      {
         $lookup: {
            from: 'users', // Assuming the collection name is 'users'
            localField: '_id',
            foreignField: '_id',
            as: 'chattedUser',
         },
      },
      {
         $unwind: '$chattedUser',
      },
      {
         $sort: { lastMessageTime: -1 },
      },
      {
         $project: {
            id: '$chattedUser._id',
            fname: '$chattedUser.fname',
            lname: '$chattedUser.lname',
            image: '$chattedUser.image',
            text: '$lastMessage.text',
            createdAt: '$lastMessage.createdAt',
         },
      },
   ])

   return lastMessages
}

export const getChatThread = async (userId, contactId) => {
   const chatThread = await Message.find({
      $or: [
         { sender: userId, receiver: contactId },
         { sender: contactId, receiver: userId },
      ],
   }).sort({ createdAt: 1 })

   return chatThread
}
