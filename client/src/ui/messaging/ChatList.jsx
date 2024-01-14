import ChatLink from './ChatLink'

// eslint-disable-next-line react/prop-types
function ChatList({ data = [] }) {
   return (
      <section className='flex flex-col gap-1 overflow-y-scroll px-1'>
         {data?.map(chat => (
            <ChatLink key={chat.id} chat={chat} />
         ))}
      </section>
   )
}
export default ChatList
