import chatContext from './chatContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'
import { useContext, useEffect } from 'react'
import socketContext from '../socket-io/socketContext'
import authContext from '../auth/authContext'

// eslint-disable-next-line react/prop-types
function ChatProvider({ children }) {
   const { socket } = useContext(socketContext)
   const { account } = useContext(authContext)
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

   useEffect(() => {
      account?.id &&
         socket.on(`chat-${account.id}`, (message, sender) => {
            queryClient.setQueryData(
               ['messages', 'chat', { id: sender }],
               prev => [...prev, message]
            )
            ;(async () => {
               await queryClient.invalidateQueries({
                  queryKey: ['chats', 'contacts'],
                  exact: true,
                  type: 'active',
               })
            })()
         })
   }, [socket, account?.id, queryClient])

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

   const sendMessage = id => {
      return {
         mutationKey: ['messages', 'chat', { id }],
         mutationFn: async payload => {
            const msg = await api.post('chat', payload)
            return msg
         },
         onSuccess: async (data, variables) => {
            queryClient.setQueryData(
               ['messages', 'chat', { id: variables.receiverId }],
               prevData => [...prevData, data]
            )
            await queryClient.invalidateQueries({
               queryKey: ['chats', 'contacts'],
               exact: true,
               type: 'active',
            })
         },
         onError: err => console.log(err),
      }
   }

   const value = {
      chatList,
      chatListLoading,
      getMessages,
      getContactInfo,
      sendMessage,
   }
   return <chatContext.Provider value={value}>{children}</chatContext.Provider>
}
export default ChatProvider
