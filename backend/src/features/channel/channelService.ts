import db from "@/config/db"
import findByUsername from "@/helpers/findByUsername"
import {formatMessageResponse} from "@/helpers/formatMessageResponse"
import {ERRORS} from "@/utils/errors"
import {MessageResponse, ReturnType} from "@/utils/types"
import {Channel, Message, User} from "@prisma/client"

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
// BUG: Deleting transaction error
export async function deleteChannelWithId(
  user: User,
  channelId: string
): Promise<ReturnType<Channel>> {
  let deletedChannel: Channel | null = null
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

  try {
    await db.$transaction(async db => {
      deletedChannel = await db.channel.delete({
        where: {
          id: channelId,
        },
      })

      await db.message.deleteMany({
        where: {
          chanSenderId: channelId,
        },
      })

      await db.user.updateMany({
        where: {
          channels: {
            some: {
              id: channelId,
            },
          },
        },
        data: {
          channels: {disconnect: {id: channelId}},
        } as any,
      })
    })
  } catch (error) {
    return {data: null, error: ERRORS.serverFailure("Failed to delete channel.")}
  }

  return {data: deletedChannel, error: null}
}

export async function getChannels(user: User): Promise<ReturnType<Channel[]>> {
  const userData = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      channels: {
        select: {
          id: true,
          name: true,
          username: true,
          desc: true,
          ownerId: true,
          image: true,
        },
      },
    },
  })

  return {data: userData?.channels ?? null, error: null}
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
    user.id !== memberList?.ownerId &&
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
  data: {
    channelId: string
    message: Message
  }
): Promise<ReturnType<MessageResponse>> {
  const channelId = data?.channelId
  const message = data?.message

  if (!channelId || !(message.text || message.emoji || message.images)) {
    return {data: null, error: ERRORS.badRequest("Invalid credentials")}
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

  const sentMessage = await db.message.create({
    data: {
      chanSenderId: channelId,
      text: message.text,
      emoji: message.emoji,
      images: message.images,
    },
  })

  return {data: formatMessageResponse(sentMessage, "channel"), error: null}
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

export async function joinChannel(
  user: User,
  data: {channelId: string}
): Promise<ReturnType<Channel>> {
  const channelId = data?.channelId
  if (!channelId) return {data: null, error: ERRORS.badRequest(["Invalid credentials"])}

  let updatedChannel: Channel | null = null

  try {
    await db.$transaction(async db => {
      // 1, add the user to the channel's members list
      updatedChannel = await db.channel.update({
        where: {
          id: channelId,
        },
        data: {
          members: {connect: {id: user.id}},
        },
      })
      // 2, add the channel to the user's channels list
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          channels: {connect: {id: channelId}},
        },
      })
    })
  } catch (error) {
    return {data: null, error: ERRORS.serverFailure("Failed to join channel.")}
  }

  return {data: updatedChannel, error: null}
}

export async function leaveChannel(
  user: User,
  body: {channelId: string}
): Promise<ReturnType<any>> {
  const channelId = body?.channelId

  if (!channelId) return {data: null, error: ERRORS.badRequest(["Invalid credentials"])}

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
    return {data: null, error: ERRORS.forbidden("Request not allowed")}
  }

  try {
    await db.$transaction(async () => {
      await db.channel.update({
        where: {
          id: channelId,
        },
        data: {
          members: {disconnect: {id: user.id}},
        },
      })

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          channels: {disconnect: {id: channelId}},
        },
      })
    })
  } catch (error) {
    return {data: null, error: ERRORS.serverFailure(["Failed to process the request"])}
  }

  return {data: "Seccussfully left the channel. ", error: null}
}
