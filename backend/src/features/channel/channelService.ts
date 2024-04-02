import db from "@/config/db"
import findByUsername from "@/helpers/findByUsername"
import {ERRORS} from "@/utils/errors"
import {ReturnType} from "@/utils/types"
import {Channel, User} from "@prisma/client"

export async function updateChannelWithId(
  user: User,
  channelId: string,
  updates
): Promise<ReturnType<Channel>> {
  const channel = await db.channel.findFirst({
    where: {
      id: channelId,
    },
    select: {
      id: true,
      ownerId: true,
    },
  })

  if (!channel || channel.ownerId !== user.id) {
    return {data: null, error: ERRORS.badRequest("Bad Request")}
  }

  if (updates.username && (await findByUsername(updates.username))) {
    return {data: null, error: ERRORS.badRequest("username not available")}
  }

  const updatedChannel = await db.channel.update({
    where: {
      id: channelId,
    },
    data: {
      name: updates.name,
      username: updates.username,
      image: updates.image,
      desc: updates.desc,
    },
  })

  return {data: updatedChannel, error: null}
}

export async function deleteChannelWithId(
  user: User,
  channelId: string
): Promise<ReturnType<Channel>> {
  const channel = await db.channel.findFirst({
    where: {
      id: channelId,
    },
    select: {
      id: true,
      ownerId: true,
    },
  })

  if (!channel || channel.ownerId !== user.id) {
    return {data: null, error: ERRORS.badRequest("Bad Request")}
  }

  await db.message.deleteMany({
    where: {
      chanSenderId: channelId,
    },
  })

  const deletedChannel = await db.channel.delete({
    where: {
      id: channelId,
    },
  })

  return {data: deletedChannel, error: null}
}

export async function getChannelById(channelId: string): Promise<ReturnType<Channel>> {
  const channel = await db.channel.findFirst({
    where: {
      id: channelId,
    },
  })
  if (!channel) return {data: null, error: ERRORS.notFound("Channel not found")}

  return {data: channel, error: null}
}

export async function getMessages(user: User, channelId: string): Promise<ReturnType<any>> {
  const memberList = await db.channel.findFirst({
    where: {
      id: channelId,
    },
    select: {
      members: {
        select: {
          id: true,
        },
      },
      ownerId: true,
    },
  })

  if (
    user.id !== memberList?.ownerId ||
    !memberList?.members.find(member => member.id === user.id)
  ) {
    return {data: null, error: ERRORS.forbidden("Forbidden")}
  }

  const messages = await db.message.findMany({
    where: {
      chanSenderId: channelId,
    },
    select: {
      id: true,
      emoji: true,
      createdAt: true,
      text: true,
      images: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  return {data: messages, error: null}
}

export async function sendMessage(
  user: User,
  channelId: string,
  messageData: {
    text?: string
    emoji?: string
    images?: string[]
  }
): Promise<ReturnType<any>> {
  if (!messageData.text && !messageData.emoji && !messageData.images) {
    return {data: null, error: ERRORS.badRequest("Invalid message data")}
  }

  const channel = await db.channel.findFirst({
    where: {
      id: channelId,
    },
    select: {
      ownerId: true,
    },
  })

  if (!channel || channel.ownerId !== user.id) {
    return {data: null, error: ERRORS.forbidden("Forbidden")}
  }

  const message = await db.message.create({
    data: {
      chanSenderId: channelId,
      text: messageData.text,
      emoji: messageData.emoji,
      images: messageData.images,
    },
  })

  return {data: message, error: null}
}

export async function getMembers(user: User, channelId: string): Promise<ReturnType<any>> {
  const memberList = await db.channel.findFirst({
    where: {
      id: channelId,
    },
    select: {
      members: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
      ownerId: true,
    },
  })

  if (
    user.id !== memberList?.ownerId ||
    !memberList?.members.find(member => member.id === user.id)
  ) {
    return {data: null, error: ERRORS.forbidden("Forbidden")}
  }

  return {data: memberList.members, error: null}
}

export async function createChannel(
  user: User,
  channelData: {
    name: string
    username?: string
    desc?: string
    image?: string
  }
): Promise<ReturnType<Channel>> {
  if (!channelData.name) {
    return {data: null, error: ERRORS.badRequest("Invalid channel data")}
  }

  const channel = await db.channel.create({
    data: {
      name: channelData.name,
      username:
        channelData.username ||
        `channel_${parseInt((Math.random() * 1e13).toString()) + Date.now()}`,
      desc: channelData.desc,
      image: channelData.image,
      ownerId: user.id,
      members: {connect: {id: user.id}},
    },
  })

  return {data: channel, error: null}
}

export async function joinChannel(user: User, channelId: string): Promise<ReturnType<Channel>> {
  const channel = await db.channel.findFirst({
    where: {
      id: channelId,
    },
    select: {
      ownerId: true,
      members: {
        select: {
          id: true,
        },
      },
    },
  })

  if (
    !channel ||
    channel.ownerId === user.id ||
    channel.members.find(member => member.id === user.id)
  ) {
    return {data: null, error: ERRORS.badRequest("Bad Request")}
  }

  const updatedChannel = await db.channel.update({
    where: {
      id: channelId,
    },
    data: {
      members: {connect: {id: user.id}},
    },
  })

  return {data: updatedChannel, error: null}
}

export async function leaveChannel(user: User, channelId: string): Promise<ReturnType<Channel>> {
  const channel = await db.channel.findFirst({
    where: {
      id: channelId,
    },
    select: {
      ownerId: true,
      members: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!channel || channel.ownerId === user.id) {
    return {data: null, error: ERRORS.badRequest("Bad Request")}
  }

  const updatedChannel = await db.channel.update({
    where: {
      id: channelId,
    },
    data: {
      members: {disconnect: {id: user.id}},
    },
  })

  return {data: updatedChannel, error: null}
}
