import { useEffect } from 'react'
import useChat from '@/store/useChat'
import useGroup from '@/store/useGroup'
import useChannel from '@/store/useChannel'

function Provider({ children }) {
   const { fetchChatList } = useChat(store => store)
   const { fetchChatList: fetchGroupList } = useGroup(store => store)
   const { fetchChatList: fetchChannelList } = useChannel(store => store)

   useEffect(() => {
      fetchChatList()
   }, [fetchChatList])

   useEffect(() => {
      fetchGroupList()
   }, [fetchGroupList])

   useEffect(() => {
      fetchChannelList()
   }, [fetchChannelList])

   return <>{children}</>
}
export default Provider
