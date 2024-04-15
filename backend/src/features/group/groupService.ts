import db from "@/config/db"
import findByUsername from "@/helpers/findByUsername"
import {formatMessageResponse} from "@/helpers/formatMessageResponse"
import {ERRORS} from "@/utils/errors"
import {MessageResponse, ReturnType} from "@/utils/types"
import {Group, Message, User} from "@prisma/client"

// GET groups
export async function getGroups(user: User): Promise<ReturnType<any[]>> {
  const userData = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      groups: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          ownerId: true,
        },
      },
    },
  })
  const groups = userData?.groups.reduce((acc, group) => {
    acc[group.id] = {...group, type: "group", lastMessage: null}
    return acc
  }, {})
  const groupIds = userData?.groups.map(group => group.id)

  // find group's last messages
  const lastMessages = await db.message.findMany({
    where: {
      groupRecId: {
        in: groupIds,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const groupsWithLastMessages = lastMessages.reduce((acc, message) => {
    const currGroup = acc[message.groupRecId!]
    if (
      !currGroup.lastMessage ||
      new Date(currGroup.lastMessage.createdAt) > new Date(message.createdAt)
    ) {
      acc[message.groupRecId!] = {
        id: currGroup.id,
        name: currGroup.name,
        username: currGroup.username,
        image: currGroup.image,
        ownerId: currGroup.ownerId,
        type: "group",
        lastMessage: {
          text: message.text,
          emoji: message.emoji,
          images: message.images,
          createdAt: message.createdAt,
        },
      }
    }
    return acc
  }, groups || {})

  const orderedContacts = Object.values(groupsWithLastMessages).sort((a: any, b: any) =>
    a.lastMessage?.createdAt > b.lastMessage?.createdAt ? -1 : 1
  )

  return {data: orderedContacts, error: null}
}

export async function updateGroup(
  user: User,
  data: {
    groupId: string
    updates: {name?: string; username?: string; desc?: string; image?: string}
  }
): Promise<ReturnType<Group>> {
  const groupId = data?.groupId
  const updates = data?.updates
  if (
    !groupId ||
    !updates ||
    !(updates.name || updates.username || updates.desc || updates.image)
  ) {
    return {data: null, error: ERRORS.badRequest("Invalid credentials")}
  }

  const group = await db.group.findFirst({
    where: {
      id: groupId,
    },
    select: {
      id: true,
      ownerId: true,
    },
  })

  if (!group || group.ownerId !== user.id) {
    return {data: null, error: ERRORS.badRequest("Bad Request")}
  }
  if (updates.username && (await findByUsername(updates.username))) {
    return {data: null, error: ERRORS.badRequest("username not available")}
  }
  const updatedGroup = await db.group.update({
    where: {
      id: groupId,
    },
    data: {
      name: updates.name,
      username: updates.username,
      image: updates.image,
      desc: updates.desc,
    },
  })
  return {data: updatedGroup, error: null}
}

// BUG: not completed group deletion
export async function deleteGroupWithId(user: User, groupId: string): Promise<ReturnType<Group>> {
  let deletedGroup: Group | null = null
  const group = await db.group.findFirst({
    where: {
      id: groupId,
    },
    select: {
      id: true,
      ownerId: true,
    },
  })
  if (!group || group.ownerId !== user.id) {
    return {data: null, error: ERRORS.badRequest("Bad Request")}
  }

  try {
    await db.$transaction(async db => {
      deletedGroup = await db.group.delete({
        where: {
          id: groupId,
        },
      })
      await db.message.deleteMany({
        where: {
          groupRecId: groupId,
        },
      })
      await db.user.updateMany({
        where: {
          groups: {
            some: {
              id: groupId,
            },
          },
        },
        data: {
          groups: {disconnect: {id: groupId}},
        } as any,
      })
    })
  } catch (error) {
    return {data: null, error: ERRORS.serverFailure("Failed to delete group.")}
  }
  return {data: deletedGroup, error: null}
}

export async function getGroupById(groupId: string): Promise<ReturnType<Group>> {
  const group = await db.group.findFirst({
    where: {
      id: groupId,
    },
    include: {
      _count: {
        select: {
          members: true,
          messages: true,
        },
      },
    },
  })
  if (!group) return {data: null, error: ERRORS.notFound("Group not found")}
  return {data: group, error: null}
}

export async function getMessages(
  user: User,
  groupId: string
): Promise<ReturnType<MessageResponse[]>> {
  const memberList = await db.group.findFirst({
    where: {
      id: groupId,
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

  if (!memberList?.members.find(member => member.id === user.id)) {
    return {data: null, error: ERRORS.forbidden("Forbidden")}
  }
  const messages = await db.message.findMany({
    where: {
      groupRecId: groupId,
    },
    include: {
      userSender: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
  })
  return {data: messages.map(message => formatMessageResponse(message, "group")), error: null}
}

export async function sendMessage(
  user: User,
  data: {
    recipientId: string
    message: Message
  }
): Promise<ReturnType<any>> {
  const groupId = data?.recipientId
  const message = data?.message

  if (!groupId || !(message.text || message.emoji || message.images)) {
    return {data: null, error: ERRORS.badRequest("Invalid credentials")}
  }
  const group = await db.group.findFirst({
    where: {
      id: groupId,
    },
    select: {
      members: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!group || !group.members.find(member => member.id === user.id)) {
    return {data: null, error: ERRORS.forbidden("Forbidden")}
  }
  const sentMessage = await db.message.create({
    data: {
      userSenderId: user.id,
      groupRecId: groupId,
      text: message.text,
      emoji: message.emoji,
      images: message.images,
    },
    include: {
      userSender: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
  })
  return {
    data: {...formatMessageResponse(sentMessage, "group"), user: sentMessage.userSender},
    error: null,
  }
}

export async function getMembers(user: User, groupId: string): Promise<ReturnType<any>> {
  const memberList = await db.group.findFirst({
    where: {
      id: groupId,
    },
    select: {
      members: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
      ownerId: true,
    },
  })

  if (!memberList?.members.find(member => member.id === user.id)) {
    return {data: null, error: ERRORS.forbidden("Forbidden")}
  }
  return {data: memberList.members, error: null}
}

export async function createGroup(
  user: User,
  groupData: {
    name: string
    username?: string
    desc?: string
    image?: string
  }
): Promise<ReturnType<Group>> {
  if (!groupData.name) {
    return {data: null, error: ERRORS.badRequest("Invalid group data")}
  }

  if (groupData.username && (await findByUsername(groupData.username))) {
    return {data: null, error: ERRORS.badRequest("username not available")}
  }

  const group = await db.group.create({
    data: {
      name: groupData.name,
      username:
        groupData.username || `group_${parseInt((Math.random() * 1e13).toString()) + Date.now()}`,
      desc: groupData.desc,
      image: groupData.image,
      ownerId: user.id,
      members: {connect: {id: user.id}},
    },
  })
  return {data: group, error: null}
}

export async function joinGroup(user: User, data: {groupId: string}): Promise<ReturnType<Group>> {
  const groupId = data?.groupId
  if (!groupId) return {data: null, error: ERRORS.badRequest(["Invalid credentials"])}

  let updatedGroup: Group | null = null
  try {
    await db.$transaction(async db => {
      // 1, add the user to the group's members list
      updatedGroup = await db.group.update({
        where: {
          id: groupId,
        },
        data: {
          members: {connect: {id: user.id}},
        },
      })
      // 2, add the group to the user's groups list
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          groups: {connect: {id: groupId}},
        },
      })
    })
  } catch (error) {
    return {data: null, error: ERRORS.serverFailure("Failed to join group.")}
  }
  return {data: updatedGroup, error: null}
}

export async function leaveGroup(user: User, body: {groupId: string}): Promise<ReturnType<any>> {
  const groupId = body?.groupId
  if (!groupId) return {data: null, error: ERRORS.badRequest(["Invalid credentials"])}
  const group = await db.group.findFirst({
    where: {
      id: groupId,
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
  if (!group || group.ownerId === user.id) {
    return {data: null, error: ERRORS.forbidden("Request not allowed")}
  }
  try {
    await db.$transaction(async () => {
      await db.group.update({
        where: {
          id: groupId,
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
          groups: {disconnect: {id: groupId}},
        },
      })
    })
  } catch (error) {
    return {data: null, error: ERRORS.serverFailure(["Failed to process the request"])}
  }
  return {data: "Successfully left the group. ", error: null}
}
