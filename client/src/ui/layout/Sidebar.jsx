import ActiveChats from '../../features/chat/ActiveChats'
import Search from '../../features/search/Search'
import ChatLink from '../messaging/ChatLink'

// eslint-disable-next-line react/prop-types
function Sidebar({ data = [], loading }) {
   return (
      <aside className='flex flex-col gap-2 py-2 transition'>
         <Search />
         <ActiveChats />
         {loading ? (
            <div>Loading...</div>
         ) : (
            <section className='flex flex-col gap-1 overflow-y-scroll px-1'>
               {data?.map(chat => (
                  <ChatLink key={chat.id} chat={chat} />
               ))}
            </section>
         )}
      </aside>
   )
}
export default Sidebar
