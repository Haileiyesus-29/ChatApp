import useChat from '@/store/useChat'
import { Outlet } from 'react-router-dom'

function Chat() {
   const { chatList, loading, fetchChatThread, messages, sendMessage } =
      useChat(store => store)

   return (
      <Outlet
         context={{ chatList, loading, fetchChatThread, messages, sendMessage }}
      />
   )
}
export default Chat
