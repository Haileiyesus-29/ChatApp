import ActiveChats from '../../features/chat/ActiveChats'
import ChatList from '../messaging/ChatList'
import Search from '../../features/search/Search'

// eslint-disable-next-line react/prop-types
function Sidebar({ data, loading }) {
   return (
      <aside className='flex flex-col gap-2 py-2 transition'>
         <Search />
         <ActiveChats />
         {loading ? <div>Loading...</div> : <ChatList data={data} />}
      </aside>
   )
}
export default Sidebar
