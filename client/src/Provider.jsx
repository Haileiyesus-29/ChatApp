/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import useChat from '@/store/useChat'
import useGroup from '@/store/useGroup'
import useChannel from '@/store/useChannel'
import instance from '@/services/socket'
import useAuth from '@/store/useAuth'

function Provider({ children }) {
   const {
      fetchChatList,
      newMessage: newChatMessage,
      setUserId,
   } = useChat(store => store)

   const { fetchChatList: fetchGroupList, newMessage: newGroupMessage } =
      useGroup(store => store)
   const { fetchChatList: fetchChannelList } = useChannel(store => store)
   const { account } = useAuth(store => store)

   useEffect(() => {
      if (account) {
         instance.socket.connect()
      }
      return () => {
         instance?.socket.disconnect()
      }
   }, [account])

   useEffect(() => {
      fetchChatList()
      setUserId(account?.id)
   }, [fetchChatList, setUserId, account])

   useEffect(() => {
      fetchGroupList()
   }, [fetchGroupList])

   useEffect(() => {
      fetchChannelList()
   }, [fetchChannelList])

   useEffect(() => {
      const listener = message => {
         newChatMessage(message)
      }
      instance.socket.on('chat:message', listener)

      return () => {
         instance.socket.off('chat:message', listener)
      }
   }, [newChatMessage])

   useEffect(() => {
      const listener = message => {
         newGroupMessage(message)
      }
      instance.socket.on('group:message', listener)

      return () => {
         instance.socket.off('group:message', listener)
      }
   }, [newGroupMessage])

   return <>{children}</>
}
export default Provider
