import useGroup from '@/store/useGroup'
import { Outlet } from 'react-router-dom'

function Group() {
   const {
      loading,
      messages,
      chatList,
      fetchGroupThread: fetchChatThread,
      sendMessage,
   } = useGroup(store => store)

   return (
      <Outlet
         context={{ chatList, loading, fetchChatThread, messages, sendMessage }}
      />
   )
}

export default Group
