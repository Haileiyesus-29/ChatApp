import ChatLink from '@/components/ChatLink'
import { useOutletContext } from 'react-router-dom'

function ChatList() {
   const { count } = useOutletContext()
   // console.log(count)

   return (
      <main className='flex flex-col gap-2 bg-zinc-900 px-4 py-2 h-full overflow-y-auto'>
         {Array.from({ length: count }).map((_, i) => (
            <ChatLink key={i} />
         ))}
      </main>
   )
}
export default ChatList
