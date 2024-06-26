import useChannel from '@/store/useChannel'
import { Outlet } from 'react-router-dom'

function Channel() {
   const {
      loading,
      messages,
      chatList,
      fetchChannelThread: fetchChatThread,
      sendMessage,
      getChannelInfo: getInfo,
   } = useChannel(store => store)

   return (
      <Outlet
         context={{
            chatList,
            loading,
            fetchChatThread,
            messages,
            sendMessage,
            getInfo,
            type: 'channel',
         }}
      />
   )
}
export default Channel
