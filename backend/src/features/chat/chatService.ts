import db from "@/config/db"
import {formatMessageResponse} from "@/helpers/formatMessageResponse"
import {ERRORS} from "@/utils/errors"
import {AccountResponse, MessageResponse, ReturnType} from "@/utils/types"
import {Message, User} from "@prisma/client"

export async function getContactList(user: User): Promise<ReturnType<AccountResponse[]>> {
  const id = user.id
  const contacts = await db.user.findFirst({
    where: {id},
    select: {
      contacts: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  })
  return {data: contacts?.contacts ?? [], error: null}
}

export async function addContact(user: User, data: {contactId: string}): Promise<ReturnType<any>> {
  const contactId = data.contactId

  if (!contactId) return {data: null, error: ERRORS.badRequest(["Invalid credential"])}

  const contact = await db.user.findFirst({
    where: {
      id: contactId,
    },
  })

  if (!contact) return {data: null, error: ERRORS.badRequest(["User id not found"])}

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      contacts: {
        connect: {id: contactId},
      },
    },
  })

  return {data: "Contact added successfully", error: null}
}

export async function getChatMessageThread(
  user: User,
  contactId: string
): Promise<ReturnType<any>> {
  const messages = await db.message.findMany({
    where: {
      OR: [
        {userSenderId: user.id, userRecId: contactId},
        {userSenderId: contactId, userRecId: user.id},
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
  data: {
    recipientId: string
    message: Message
  }
): Promise<ReturnType<MessageResponse>> {
  const recipientId = data?.recipientId
  const message = data?.message

  if (!recipientId || !(message.text || message.emoji || message?.images.length))
    return {data: null, error: ERRORS.badRequest(["Invalid credentials"])}

  const recipient = await db.user.findFirst({
    where: {id: recipientId},
  })

  if (!recipient) return {data: null, error: ERRORS.notFound(["Can't find user account"])}

  const newMessage = await db.message.create({
    data: {
      text: message.text,
      emoji: message.emoji,
      images: message.images,
      userSenderId: user.id,
      userRecId: recipientId,
    },
  })

  return {data: formatMessageResponse(newMessage, "chat"), error: null}
}

export async function getChattedAccounts(user: User): Promise<ReturnType<any[]>> {
  const id = user.id
  const messages = await db.message.findMany({
    where: {
      OR: [
        {AND: [{userSenderId: id}, {userRecId: {not: null}}]},
        {AND: [{userSenderId: {not: null}}, {userRecId: id}]},
      ],
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

  for (const message of messages) {
    const chattedPerson: {id: string; name: string; image: string | null} =
      message.userSender?.id === id ? message.userRec! : message.userSender!

    if (chattedUsers[chattedPerson.id]) continue

    chattedUsers[chattedPerson.id] = {
      id: chattedPerson.id,
      name: chattedPerson.name,
      image: chattedPerson.image,
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
