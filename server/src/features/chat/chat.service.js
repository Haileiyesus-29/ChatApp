import mongoose from 'mongoose'
import Message from '../../models/message.model.js'
import User from '../../models/user.model.js'
import ERRORS from '../../../config/_errors.js'

export const chatToUserAccount = async (user, data) => {
   const { images, text, receiverId } = data

   if (!receiverId || !(text || images?.length))
      return ERRORS.INVALID_CREDENTIAL

   const receiver = await User.findById(receiverId)
   if (!receiver) return ERRORS.BAD_REQUEST

   const message = new Message({
      sender: user.id,
      receiver: receiverId,
      chatType: 'User',
      images,
      text,
   })
   const sentMessage = await message.save()
   return { message: sentMessage }
}

export const getChattedContacts = async user => {
   const lastMessages = await Message.aggregate([
      {
         $match: {
            $or: [
               { sender: new mongoose.Types.ObjectId(user.id) },
               { receiver: new mongoose.Types.ObjectId(user.id) },
            ],
         },
      },
      {
         $group: {
            _id: {
               $cond: [
                  { $eq: ['$sender', new mongoose.Types.ObjectId(user.id)] },
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
   if (!lastMessages) return ERRORS.SERVER_FAILED

   return { conctacts: lastMessages }
}

export const getChatThread = async (user, contactId) => {
   if (!contactId) return ERRORS.INVALID_CREDENTIAL

   const chatThread = await Message.find({
      $or: [
         { sender: user.id, receiver: contactId },
         { sender: contactId, receiver: user.id },
      ],
   }).sort({ createdAt: 1 })

   return { messages: chatThread }
}
