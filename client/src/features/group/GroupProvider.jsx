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
      queryKey: ['chats', 'contacts'],
      queryFn: async () => {
         const result = await api.get('group')
         return result
      },
   })

   const value = {
      chatList,
      chatListLoading,
   }
   return (
      <groupContext.Provider value={value}>{children}</groupContext.Provider>
   )
}
export default GroupProvider
