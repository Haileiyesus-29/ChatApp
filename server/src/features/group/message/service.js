import Message from '../../../models/message.model.js'
import User from '../../../models/user.model.js'
import Group from '../../../models/group.model.js' // Replace with your actual group model

export const sendGroupMessage = async (user, groupId, payload) => {
   if (!user.groups.includes(groupId)) return null
   const { text, images } = payload
   if (!(text || images?.length)) return null

   const message = new Message({
      text,
      images,
      sender: user.id,
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

export const getChattedGroups = async userId => {
   return userId

   // const lastGroupMessages = await Message.aggregate([
   //    {
   //       $match:
   //          receiver: new mongoose.Types.ObjectId(userId), // Assuming userId is a member of groups
   //          chatType: 'Group', // Specify chat type for groups
   //       },
   //    },
   //    {
   //       $group: {
   //          _id: '$receiver', // Group by group (receiver)
   //          lastMessageTime: { $max: '$createdAt' },
   //          lastMessage: { $last: '$$ROOT' },
   //       },
   //    },
   //    {
   //       $lookup: {
   //          from: 'groups', // Assuming the collection name is 'groups'
   //          localField: '_id',
   //          foreignField: '_id',
   //          as: 'chattedGroup',
   //       },
   //    },
   //    {
   //       $unwind: '$chattedGroup',
   //    },
   //    {
   //       $sort: { lastMessageTime: -1 },
   //    },
   //    {
   //       $project: {
   //          id: '$chattedGroup._id',
   //          name: '$chattedGroup.name',
   //          username: '$chattedGroup.username',
   //          image: '$chattedGroup.image',
   //          text: '$lastMessage.text',
   //          createdAt: '$lastMessage.createdAt',
   //       },
   //    },
   // ])

   // return lastGroupMessages
}
export const getSubscribedGroupsLastMessages = async user => {
   const subscribedGroups = user.groups

   const subscribedGroupInfo = await Group.find({
      _id: { $in: subscribedGroups },
   }).select('_id name username image createdAt')

   const lastMessages = await Message.aggregate([
      {
         $match: {
            receiver: { $in: subscribedGroups },
         },
      },
      {
         $group: {
            _id: '$receiver',
            lastMessageTime: { $max: '$createdAt' },
            lastMessage: { $last: '$$ROOT' },
         },
      },
      {
         $lookup: {
            from: 'groups',
            localField: '_id',
            foreignField: '_id',
            as: 'chattedGroup',
         },
      },
      {
         $unwind: '$chattedGroup',
      },
      {
         $sort: { lastMessageTime: -1 },
      },
      {
         $project: {
            id: '$chattedGroup._id',
            name: '$chattedGroup.name',
            username: '$chattedGroup.username',
            image: '$chattedGroup.image',
            text: '$lastMessage.text',
            createdAt: '$lastMessage.createdAt',
         },
      },
   ])

   const mergedResult = subscribedGroupInfo.map(subscribedGroup => {
      const groupWithMessage = lastMessages.find(
         groupInfo => groupInfo.id.toString() === subscribedGroup._id.toString()
      )

      return (
         groupWithMessage || {
            id: subscribedGroup._id,
            name: subscribedGroup.name,
            username: subscribedGroup.username,
            image: subscribedGroup.image,
            text: '',
            createdAt: subscribedGroup.createdAt,
         }
      )
   })

   const sortedResult = mergedResult.sort((a, b) =>
      a.lastMessageTime
         ? b.lastMessageTime
            ? b.lastMessageTime - a.lastMessageTime
            : 1
         : -1
   )

   return sortedResult
}
