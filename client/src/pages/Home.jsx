import instace from '@/services/socket'
import useChat from '@/store/useChat'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
   const { chatList, loading } = useChat(store => store)

   useEffect(() => {
      instace.socket.emit('message', 'Hello from client')
   }, [])

   return <Outlet context={{ chatList, loading }} />
}
export default Home
