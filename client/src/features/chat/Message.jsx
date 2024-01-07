import useSocket from '../../hooks/useSocket'
import ChatBubble from '../../ui/messaging/ChatBubble'
import ChatForm from '../../ui/messaging/ChatForm'
import ChatStatus from './ChatStatus'

function Message() {
   const { data, emit, error } = useSocket('connection')
   if (data) console.log(data)
   if (error) console.log(error)

   return (
      <section className=' flex-col flex'>
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
export default Message
