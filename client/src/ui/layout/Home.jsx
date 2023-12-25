import ActiveChats from '../../features/chat/ActiveChats'
import ChatList from '../../features/chat/ChatList'
import Search from '../../features/search/Search'

function Home() {
   return (
      <main
         className='flex flex-col gap-2 py-2 transition'
         style={{ maxWidth: 'calc(100vw - 4rem)' }}
      >
         <Search />
         <ActiveChats />
         <ChatList />
      </main>
   )
}
export default Home
