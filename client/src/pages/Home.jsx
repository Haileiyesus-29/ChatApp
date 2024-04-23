import useChannel from '@/store/useChannel'
import useChat from '@/store/useChat'
import useGroup from '@/store/useGroup'
import { Outlet } from 'react-router-dom'

function Home() {
   const { chatList: userChatList, loading: userLoading } = useChat(
      store => store
   )
   const { chatList: groupChatList, loading: groupLoading } = useGroup(
      store => store
   )
   const { chatList: channelChatList, loading: channelLoading } = useChannel(
      store => store
   )

   const loading = userLoading || groupLoading || channelLoading

   const chatList = [
      ...userChatList,
      ...groupChatList,
      ...channelChatList,
   ].sort((a, b) => {
      const dateA = new Date(a.lastMessage.createdAt)
      const dateB = new Date(b.lastMessage.createdAt)
      return dateB - dateA
   })

   return <Outlet context={{ chatList, loading }} />
}
export default Home
