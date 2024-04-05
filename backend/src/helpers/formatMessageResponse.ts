import {MessageResponse} from "@/utils/types"
import {Message} from "@prisma/client"

export function formatMessageResponse(
  message: Message,
  type: "chat" | "group" | "channel"
): MessageResponse {
  return {
    id: message.id,
    text: message.text,
    images: message.images,
    createdAt: message.createdAt,
    sender: message.userSenderId! || message.chanSenderId!,
    receiver: message.userRecId! || message.groupRecId!,
    type,
  }
}
