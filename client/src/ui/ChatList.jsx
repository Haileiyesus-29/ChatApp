import ChatLink from "@/components/ChatLink"
import {useOutletContext} from "react-router-dom"

function ChatList() {
  const {chatList} = useOutletContext()

  console.log("re-rendered")

  return (
    <main className="flex flex-col gap-1 bg-zinc-900 p-1 h-full overflow-y-auto">
      {(chatList ?? []).map(chat => (
        <ChatLink key={chat.id} user={chat} />
      ))}
      {chatList?.length === 0 && (
        <p className="py-10 text-center text-zinc-500">No chats available</p>
      )}
    </main>
  )
}
export default ChatList
