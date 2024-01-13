import { useState } from 'react'
import chatContext from './chatContext'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

// eslint-disable-next-line react/prop-types
function ChatProvider({ children }) {
   const { data: chatList } = useQuery({
      queryKey: ['chats', 'contacts'],
      queryFn: async () => {
         const result = await api.get('chat')
         return result
      },
   })

   const value = { chatList }
   return (
      <chatContext.Provider value={chatList}>{children}</chatContext.Provider>
   )
}
export default ChatProvider
