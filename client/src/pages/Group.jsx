import useGroup from '@/store/useGroup'
import { Outlet } from 'react-router-dom'

function Group() {
   const {
      loading,
      messages,
      chatList,
      fetchGroupThread: fetchChatThread,
      sendMessage,
      getGroupInfo: getInfo,
   } = useGroup(store => store)

   return (
      <Outlet
         context={{
            chatList,
            loading,
            fetchChatThread,
            messages,
            sendMessage,
            getInfo,
            type: 'group',
         }}
      />
   )
}

export default Group
