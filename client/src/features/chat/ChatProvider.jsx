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
      queryKey: ['chat', 'contacts'],
      queryFn: async () => {
         const response = await api.get('chat')
         return response.data
      },
   })

   useEffect(() => {
      const handleSocketMessage = (message, from, to) => {
         queryClient.setQueryData(
            ['messages', 'chat', { id: account.id === from ? to : from }],
            prev => [
               ...(prev || []),
               {
                  ...message,
                  type: message.sender === account.id ? 'sent' : 'received',
               },
            ]
         )

         queryClient.invalidateQueries({
            queryKey: ['chat', 'contacts'],
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

   const fetchMessages = async id => {
      const data = await queryClient.ensureQueryData({
         queryKey: ['messages', 'chat', { id }],
         queryFn: async () => {
            const response = await api.get(`chat/${id}`)
            return response.data.map(msg => ({
               ...msg,
               type: account.id === msg.sender ? 'sent' : 'received',
            }))
         },
      })
      return data
   }

   const getContactInfo = async id => {
      const data = await queryClient.ensureQueryData({
         queryKey: ['account', 'chat', { id }],
         queryFn: async () => {
            const response = await api.get(`user/${id}`)
            return response.data
         },
      })
      return data
   }
   const sendMessage = useCallback(async payload => {
      const response = await api.post(`chat`, payload)
      return response.data
   }, [])

   const value = {
      chatList,
      chatListLoading,
      fetchMessages,
      getContactInfo,
      sendMessage,
   }

   return <chatContext.Provider value={value}>{children}</chatContext.Provider>
}

export default ChatProvider
