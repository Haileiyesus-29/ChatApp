import chatContext from './chatContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'
import { useEffect } from 'react'

// eslint-disable-next-line react/prop-types
function ChatProvider({ children }) {
   const queryClient = useQueryClient()

   const { data: chatList, isLoading: chatListLoading } = useQuery({
      queryKey: ['chats', 'contacts'],
      queryFn: async () => {
         const result = await api.get('chat')
         return result
      },
   })

   useEffect(() => {
      chatList?.forEach(chat =>
         queryClient.prefetchQuery({
            queryKey: ['messages', 'chat', { id: chat.id }],
            queryFn: async () => {
               const messages = await api.get(`chat/${chat.id}`)
               return messages
            },
         })
      )
   }, [chatList, queryClient])

   const getMessages = id => {
      return {
         queryKey: ['messages', 'chat', { id }],
         queryFn: async () => {
            const messages = await api.get(`chat/${id}`)
            return messages
         },
         enabled: !!id,
      }
   }

   const getContactInfo = id => {
      return {
         queryKey: ['account', 'chat', { id }],
         queryFn: async () => {
            const user = await api.get(`user/${id}`)
            return user
         },
         enabled: !!id,
      }
   }

   const value = { chatList, chatListLoading, getMessages, getContactInfo }
   return <chatContext.Provider value={value}>{children}</chatContext.Provider>
}
export default ChatProvider
