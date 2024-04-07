import { useEffect } from 'react'
import useChat from './store/useChat'

function Provider({ children }) {
   const { fetchChatList } = useChat(store => store)
   useEffect(() => {
      fetchChatList()
   }, [fetchChatList])

   return <>{children}</>
}
export default Provider
