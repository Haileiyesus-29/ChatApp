import { useCallback, useContext, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import groupContext from './groupContext'
import socketContext from '../socket-io/socketContext'
import authContext from '../auth/authContext'
import api from '../../services/api'

// eslint-disable-next-line react/prop-types
function GroupProvider({ children }) {
   const { socket } = useContext(socketContext)
   const { account } = useContext(authContext)

   const queryClient = useQueryClient()

   const { data: chatList, isLoading: chatListLoading } = useQuery({
      queryKey: ['group', 'contacts'],
      queryFn: async () => {
         const response = await api.get('group/chatlist')
         return response.data
      },
   })

   useEffect(() => {
      const handleSocketMessage = (message, groupId) => {
         queryClient.setQueryData(
            ['messages', 'group', { id: groupId }],
            prev => [
               ...(prev || []),
               {
                  ...message,
                  type: account.id === message.sender ? 'sent' : 'received',
               },
            ]
         )

         queryClient.invalidateQueries({
            queryKey: ['group', 'contacts'],
            exact: true,
            type: 'active',
         })
      }

      if (socket) {
         chatList.forEach(chat =>
            socket.on(`group-${chat.id}`, handleSocketMessage)
         )
      }

      return () => {
         if (socket) {
            chatList.forEach(chat =>
               socket.off(`group-${chat.id}`, handleSocketMessage)
            )
         }
      }
   }, [socket, account.id, queryClient, chatList])

   const fetchMessages = async id => {
      const data = await queryClient.ensureQueryData({
         queryKey: ['messages', 'group', { id }],
         queryFn: async () => {
            const response = await api.get(`group/message/${id}`)
            return response.data.map(msg => ({
               ...(msg || []),
               type: account.id === msg.sender ? 'sent' : 'received',
            }))
         },
      })
      return data
   }

   const getContactInfo = async id => {
      const data = await queryClient.ensureQueryData({
         queryKey: ['account', 'group', { id }],
         queryFn: async () => {
            const response = await api.get(`group/${id}`)
            return response.data
         },
      })
      return data
   }

   const sendMessage = useCallback(async payload => {
      const response = await api.post(`group/message`, payload)
      return response.data
   }, [])

   const createGroup = useCallback(
      async payload => {
         try {
            const response = await api.post('group', payload)
            queryClient.invalidateQueries({
               queryKey: ['group', 'contacts'],
            })
            return response
         } catch (error) {
            console.error(error)
         }
      },
      [queryClient]
   )

   const value = {
      chatList,
      chatListLoading,
      fetchMessages,
      getContactInfo,
      sendMessage,
      createGroup,
   }
   return (
      <groupContext.Provider value={value}>{children}</groupContext.Provider>
   )
}
export default GroupProvider
