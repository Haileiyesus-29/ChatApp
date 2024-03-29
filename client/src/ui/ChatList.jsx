import ChatLink from '@/components/ChatLink'

function ChatList() {
   return (
      <main className='flex flex-col gap-2 bg-zinc-900 px-4 py-2 h-full overflow-y-auto'>
         {Array.from({ length: 10 }).map((_, i) => (
            <ChatLink key={i} />
         ))}
      </main>
   )
}
export default ChatList
