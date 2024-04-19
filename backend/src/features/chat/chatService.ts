import db from "@/config/db"
import {formatMessageResponse} from "@/helpers/formatMessageResponse"
import {ERRORS} from "@/utils/errors"
import {AccountResponse, MessageResponse, ReturnType} from "@/utils/types"
import {Message, User} from "@prisma/client"

export async function getContactList(user: User): Promise<ReturnType<any[]>> {
  const id = user.id

  // 1, Fetch user data with contacts
  const userData = await db.user.findFirst({
    where: {id},
    select: {
      id: true,
      contacts: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
  })

  const contacts = userData?.contacts ?? []
  const contactIds = contacts.map(contact => contact.id)

  // 2. Fetch all messages with user and contacts
  const userMessages = await db.message.findMany({
    where: {
      OR: [
        {
          AND: [{userSenderId: {equals: userData?.id}}, {userRecId: {in: contactIds}}],
        },
        {
          AND: [{userRecId: {equals: userData?.id}}, {userSenderId: {in: contactIds}}],
        },
      ],
    },
    include: {
      userSender: {select: {id: true, name: true, image: true, username: true}},
      userRec: {select: {id: true, name: true, image: true, username: true}},
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // 3. Compute last message with each contact
  const chattedContacts = {}
  for (let message of userMessages) {
    const chattedPerson: {id: string; name: string; image: string | null; username: string} =
      message.userSender?.id === id ? message.userRec! : message.userSender!

    if (chattedContacts[chattedPerson.id]) continue

    chattedContacts[chattedPerson.id] = {
      id: chattedPerson.id,
      name: chattedPerson.name,
      image: chattedPerson.image,
      username: chattedPerson.username,
      type: "chat",
      lastMessage: {
        id: message.id,
        text: message.text,
        emoji: message.emoji,
        images: message.images,
        createdAt: message.createdAt,
      },
    }
  }

  // 4. Convert object to array and sort by last message date
  const contactsWithLastMessage = Object.values(chattedContacts).sort((a: any, b: any) =>
    a.lastMessage.createdAt > b.lastMessage.createdAt ? -1 : 1
  )

  // 5, Merge contacts without messages with contacts with messages
  for (let contact of contacts) {
    if (!contactsWithLastMessage.find((item: any) => item.id === contact.id)) {
      contactsWithLastMessage.push({...contact, lastMessage: null})
    }
  }

  return {data: contactsWithLastMessage ?? [], error: null}
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
): Promise<ReturnType<MessageResponse[]>> {
  const messages = await db.message.findMany({
    where: {
      OR: [
        {userSenderId: user.id, userRecId: contactId},
        {userSenderId: contactId, userRecId: user.id},
      ],
    },
  })

  return {
    data: messages.map(msg => formatMessageResponse({...msg, userSender: null}, "chat")),
    error: null,
  }
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

  return {data: formatMessageResponse({...newMessage, userSender: null}, "chat"), error: null}
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
    orderBy: {
      createdAt: "desc",
    },
    include: {
      userSender: {select: {id: true, name: true, image: true}},
      userRec: {select: {id: true, name: true, image: true}},
    },
  })

  const chattedUsers = messages.reduce((acc, message) => {
    const chattedPerson: {id: string; name: string; image: string | null} =
      message.userSender?.id === id ? message.userRec! : message.userSender!

    if (acc[chattedPerson.id]) return acc

    acc[chattedPerson.id] = {
      id: chattedPerson.id,
      name: chattedPerson.name,
      image: chattedPerson.image,
      type: "chat",
      lastMessage: {
        text: message.text,
        emoji: message.emoji,
        images: message.images,
        createdAt: message.createdAt,
      },
    }

    return acc
  }, {})

  const arrayOfUsers = Object.values(chattedUsers).sort((a: any, b: any) =>
    a.createdAt > b.createdAt ? -1 : 1
  )

  return {data: arrayOfUsers, error: null}
}
