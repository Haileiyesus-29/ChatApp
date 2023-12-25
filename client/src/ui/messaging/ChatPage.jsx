import ChatStatus from '../../features/chat/ChatStatus'
import ChatBubble from './ChatBubble'
import ChatForm from './ChatForm'

function ChatPage() {
   return (
      <section className=' flex-col hidden md:flex'>
         <ChatStatus />
         <div className='py-2 overflow-y-auto'>
            <ChatBubble type='received' details={false} />
            <ChatBubble type='sent' details={false} />
            <ChatBubble type='received' details={false} />
            <ChatBubble type='sent' details={false} />
         </div>
         <ChatForm />
      </section>
   )
}
export default ChatPage
