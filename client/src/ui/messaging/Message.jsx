import { useEffect, useRef } from 'react'
import ChatBubble from './ChatBubble'
import ChatForm from './ChatForm'
import Info from './Info'
import Title from './Title'

// eslint-disable-next-line react/prop-types
function Message({ messages, onMessage, info }) {
   const messageBox = useRef()

   useEffect(() => {
      messageBox.current.scrollTop = messageBox.current.scrollHeight
   }, [messages])

   return (
      <section id='message' className='grid grid-cols-[5fr_3fr] grid-rows-1'>
         <div className='flex-col flex dark:bg-base-200'>
            <Title {...info} />
            <div ref={messageBox} className='py-2 overflow-y-auto'>
               {messages.map(message => (
                  <ChatBubble
                     key={message.id}
                     details={false}
                     createdAt={message.createdAt}
                     images={message.images}
                     text={message.text}
                     type={message.type}
                  />
               ))}
            </div>
            <ChatForm handleSubmit={onMessage} />
         </div>
         <Info chatInfo={info} />
      </section>
   )
}
export default Message
