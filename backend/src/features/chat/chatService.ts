import db from "@/config/db"
import {ERRORS} from "@/utils/errors"
import {AccountResponse, ReturnType} from "@/utils/types"
import {User} from "@prisma/client"

export async function getContactList(user: User): Promise<ReturnType<AccountResponse[]>> {
  const id = user.id
  const contacts = await db.user.findFirst({
    where: {id},
    select: {
      contacts: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
  return {data: contacts?.contacts ?? [], error: null}
}

export async function getChatMessageThread(
  user: User,
  contactId: string
): Promise<ReturnType<any>> {
  const messages = await db.message.findMany({
    where: {
      OR: [
        {userSenderId: user.id, userId: contactId},
        {userSenderId: contactId, userId: user.id},
      ],
    },
    select: {
      id: true,
      text: true,
      emoji: true,
      images: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return {data: messages, error: null}
}

export async function sendMessage(
  user: User,
  contactId: string,
  message: string
): Promise<ReturnType<any>> {
  const newMessage = await db.message.create({
    data: {
      text: message,
      userSenderId: user.id,
      userId: contactId,
    },
  })

  if (!newMessage) return {data: null, error: ERRORS.serverFailure(["Failed to send message"])}

  return {data: newMessage, error: null}
}

export async function getChattedAccounts(user: User): Promise<ReturnType<any>> {
  const id = user.id
  const users = await db.message.findMany({
    where: {
      OR: [{userSenderId: id}, {userId: id}],
    },
    select: {
      text: true,
      emoji: true,
      images: true,
      createdAt: true,
      userSender: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      userRec: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  let chattedUsers = {}

  for (const message of users) {
    const user = message.userSender?.id === id ? message.userRec : message.userSender
    if (!user?.id) continue
    chattedUsers[user.id] = {
      id: user.id,
      name: user.name,
      image: user.image,
      text: message.text,
      emoji: message.emoji,
      images: message.images,
      createdAt: message.createdAt,
    }
  }

  const arrayOfUsers = Object.values(chattedUsers).sort((a: any, b: any) =>
    a.createdAt > b.createdAt ? -1 : 1
  )

  return {data: arrayOfUsers, error: null}
}
