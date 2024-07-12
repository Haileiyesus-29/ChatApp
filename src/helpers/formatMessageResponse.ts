import {MessageResponse} from "../utils/types"
import {Message} from "@prisma/client"

type MessageFormat = {
  userSender: {name: string; id: string; image: string | null; username: string} | null
} & Message

export function formatMessageResponse(
  message: MessageFormat,
  type: "chat" | "group" | "channel"
): MessageResponse {
  let user = message.userSender

  return {
    id: message.id,
    text: message.text,
    images: message.images,
    createdAt: message.createdAt,
    sender: message.userSenderId! || message.chanSenderId!,
    receiver: message.userRecId! || message.groupRecId!,
    type,
    user,
  }
}
