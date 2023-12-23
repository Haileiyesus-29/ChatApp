import ChatBubble from '../../ui/ChatBubble'
import ChatStatus from './ChatStatus'

function Message() {
   return (
      <section className=' flex-col hidden md:flex'>
         <ChatStatus />
         <div className='py-2 overflow-y-auto'>
            <ChatBubble type='received' details={false} />
            <ChatBubble type='sent' details={false} />
            <ChatBubble type='received' details={false} />
            <ChatBubble type='sent' details={false} />
         </div>
      </section>
   )
}
export default Message
