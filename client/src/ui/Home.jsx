import ActiveChats from '../features/chat/ActiveChats'
import ChatList from '../features/chat/ChatList'
import Search from './Search'

function Home() {
   return (
      <main
         className='p-2 flex flex-col gap-2 md:max-w-xs transition'
         style={{ width: 'calc(100vw - 4rem)' }}
      >
         <Search />
         <ActiveChats />
         <ChatList />
      </main>
   )
}
export default Home
