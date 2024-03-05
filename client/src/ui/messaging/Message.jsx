import { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import ChatForm from './ChatForm'
import Info from './Info'
import Title from './Title'

// eslint-disable-next-line react/prop-types
function Message({ messages, onMessage, info, withDetails = false }) {
   const messageBox = useRef()
   const [view, setView] = useState('chat')

   useEffect(() => {
      messageBox.current.scrollTop = messageBox.current.scrollHeight
   }, [messages])

   return (
      <section
         id='message'
         className='grid grid-cols-1 lg:grid-cols-[5fr_3fr] grid-rows-1'
      >
         <div
            className={`flex-col dark:bg-base-200 lg:flex ${
               view === 'chat' ? 'flex' : 'hidden'
            }`}
         >
            <Title {...info} />
            <div ref={messageBox} className='py-2 overflow-y-auto'>
               {messages.map(message => (
                  <ChatBubble
                     key={message.id}
                     details={withDetails}
                     {...message}
                  />
               ))}
            </div>
            <ChatForm key={Math.random()} handleSubmit={onMessage} />
         </div>
         <Info view={view} chatInfo={info} />
      </section>
   )
}
export default Message
