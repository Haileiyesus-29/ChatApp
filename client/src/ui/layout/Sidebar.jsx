import ActiveChats from '../../features/chat/ActiveChats'
// import Search from '../../features/search/Search'
import ChatLink from '../messaging/ChatLink'

// eslint-disable-next-line react/prop-types
function Sidebar({ data = [], loading, link, el, id }) {
   return (
      <aside
         className={`md:flex flex-col gap-2 py-2 transition ${
            id ? 'hidden' : 'flex'
         }`}
      >
         {/* <Search /> */}
         <ActiveChats />
         {el}
         {loading ? (
            <div>Loading...</div>
         ) : (
            <section className='flex flex-col gap-1 px-1 overflow-y-scroll'>
               {data?.map(chat => (
                  <ChatLink
                     key={chat.id}
                     chat={chat}
                     linkTo={`/${link}/${chat.id}`}
                  />
               ))}
            </section>
         )}
      </aside>
   )
}
export default Sidebar
