import ChatLink from '@/components/ChatLink'
import paths from '@/paths'
import { useOutletContext } from 'react-router-dom'

function ChatList() {
   const { chatList, loading } = useOutletContext()

   return (
      <main className='flex flex-col gap-2 bg-zinc-900 px-4 py-2 h-full overflow-y-auto'>
         {(chatList ?? []).map(chat => (
            <ChatLink key={chat.id} user={chat} />
         ))}
      </main>
   )
}
export default ChatList
