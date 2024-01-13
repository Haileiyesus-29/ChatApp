import ActiveChats from '../../features/chat/ActiveChats'
import ChatList from '../messaging/ChatList'
import Search from '../../features/search/Search'

function Sidebar() {
   return (
      <aside className='flex flex-col gap-2 py-2 transition'>
         <Search />
         <ActiveChats />
         <ChatList />
      </aside>
   )
}
export default Sidebar
