import useChat from '@/store/useChat'
import { Outlet } from 'react-router-dom'

function Home() {
   const { chatList, loading } = useChat(store => store)
   // console.log(chatList)

   return <Outlet context={{ chatList, loading }} />
}
export default Home
