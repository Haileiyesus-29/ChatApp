import Message from '../../../models/message.model.js'
import Group from '../../../models/group.model.js'
import ERRORS from '../../../../config/_errors.js'

export const sendGroupMessage = async (user, data) => {
   const { groupId, text, images } = data

   if (!user.groups.includes(groupId)) return ERRORS.BAD_REQUEST
   if (!(text || images?.length)) return ERRORS.INVALID_CREDENTIAL

   const message = new Message({
      text,
      images,
      sender: user.id,
      receiver: groupId,
      chatType: 'Group',
   })
   const newMessage = await message.save()
   return { message: newMessage }
}

export const findGroupMessages = async groupId => {
   if (!groupId) return ERRORS.INVALID_CREDENTIAL

   const messages = await Message.find({ receiver: groupId })
      .populate('sender', 'image name')
      .select('-chatType')
      .lean()

   const transformed = messages.map(msg => ({
      ...msg,
      id: msg._id,
      image: msg.sender.image,
      name: msg.sender.name,
      sender: msg.sender._id,
      _id: undefined,
   }))
   return { messages: transformed }
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

   return { groups: sortedResult }
}
