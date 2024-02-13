import chatContext from './chatContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'
import { useContext, useEffect, useCallback } from 'react'
import socketContext from '../socket-io/socketContext'
import authContext from '../auth/authContext'

// eslint-disable-next-line react/prop-types
function ChatProvider({ children }) {
   const { account } = useContext(authContext)
   const { socket } = useContext(socketContext)
   const queryClient = useQueryClient()

   const { data: chatList, isLoading: chatListLoading } = useQuery({
      queryKey: ['chats', 'contacts'],
      queryFn: async () => {
         const response = await api.get('chat')
         return response.data
      },
   })

   useEffect(() => {
      const prefetchMessages = async () => {
         chatList &&
            (await Promise.all(
               chatList.map(chat =>
                  queryClient.prefetchQuery({
                     queryKey: ['messages', 'chat', { id: chat.id }],
                     queryFn: async () => {
                        const response = await api.get(`chat/${chat.id}`)
                        return response.data
                     },
                  })
               )
            ))
      }

      prefetchMessages()
   }, [chatList, queryClient])

   useEffect(() => {
      const handleSocketMessage = (message, sender) => {
         queryClient.setQueryData(
            ['messages', 'chat', { id: sender }],
            prev => [...prev, message]
         )

         queryClient.invalidateQueries({
            queryKey: ['chats', 'contacts'],
            exact: true,
            type: 'active',
         })
      }

      if (socket) {
         socket.on(`chat-${account.id}`, handleSocketMessage)
      }

      return () => {
         if (socket) {
            socket.off(`chat-${account.id}`, handleSocketMessage)
         }
      }
   }, [socket, account.id, queryClient])

   const getMessages = useCallback(
      id => ({
         queryKey: ['messages', 'chat', { id }],
         queryFn: async () => {
            const response = await api.get(`chat/${id}`)
            return response.data
         },
         enabled: !!id,
      }),
      []
   )

   const getContactInfo = useCallback(
      id => ({
         queryKey: ['account', 'chat', { id }],
         queryFn: async () => {
            const response = await api.get(`user/${id}`)
            return response.data
         },
         enabled: !!id,
      }),
      []
   )

   const sendMessage = useCallback(
      id => ({
         mutationKey: ['messages', 'chat', { id }],
         mutationFn: async payload => {
            const msg = await api.post('chat', payload)
            return msg
         },
         onSuccess: async (response, variables) => {
            queryClient.setQueryData(
               ['messages', 'chat', { id: variables.receiverId }],
               prevData => [...prevData, response.data]
            )

            await queryClient.invalidateQueries({
               queryKey: ['chats', 'contacts'],
               exact: true,
               type: 'active',
            })
         },
         onError: err => console.log(err),
      }),
      [queryClient]
   )

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
