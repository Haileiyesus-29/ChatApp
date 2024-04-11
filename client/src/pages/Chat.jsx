import useChat from '@/store/useChat'
import { Outlet } from 'react-router-dom'

function Chat() {
   const {
      chatList,
      loading,
      fetchChatThread,
      messages,
      sendMessage,
      getChatInfo: getInfo,
   } = useChat(store => store)

   return (
      <Outlet
         context={{
            chatList,
            loading,
            fetchChatThread,
            messages,
            sendMessage,
            getInfo,
            type: 'chat',
         }}
      />
   )
}
export default Chat
