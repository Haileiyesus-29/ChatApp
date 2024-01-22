import { useContext } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import groupContext from './groupContext'
import socketContext from '../socket-io/socketContext'
import authContext from '../auth/authContext'
import api from '../../services/api'

// eslint-disable-next-line react/prop-types
function GroupProvider({ children }) {
   const { socket, emit } = useContext(socketContext)
   const { account } = useContext(authContext)

   const queryClient = useQueryClient()

   const { data: chatList, isLoading: chatListLoading } = useQuery({
      queryKey: ['group', 'contacts'],
      queryFn: async () => {
         const response = await api.get('group/chatlist')
         return response.data
      },
   })

   const getMessages = id => {
      return {
         queryKey: ['messages', 'group', { id }],
         queryFn: async () => {
            const response = await api.get(`group/message/${id}`)
            return response.data
         },
         enabled: !!id,
      }
   }

   const getContactInfo = id => {
      return {
         queryKey: ['account', 'group', { id }],
         queryFn: async () => {
            const response = await api.get(`group/${id}`)
            return response.data
         },
         enabled: !!id,
      }
   }
   const sendMessage = id => {
      return {
         mutationKey: ['messages', 'group', { id }],
         mutationFn: async payload => {
            const response = await api.post('group/message', {
               ...payload,
               groupId: payload.receiverId,
            })
            return response.data
         },
         onSuccess: async (response, variables) => {
            queryClient.setQueryData(
               ['messages', 'group', { id: variables.receiverId }],
               prevData => [...prevData, response.data]
            )
            await queryClient.invalidateQueries({
               queryKey: ['group', 'contacts'],
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
   return (
      <groupContext.Provider value={value}>{children}</groupContext.Provider>
   )
}
export default GroupProvider
