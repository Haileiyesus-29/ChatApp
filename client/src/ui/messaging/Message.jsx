import { useParams } from 'react-router-dom'
import ChatBubble from './ChatBubble'
import ChatForm from './ChatForm'
import Info from './Info'
import Title from './Title'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useRef } from 'react'
import authContext from '../../features/auth/authContext'

// eslint-disable-next-line react/prop-types
function Message({ getMessages, getContactInfo, sendMessage }) {
   const messageBox = useRef()
   const { id } = useParams()
   const {
      account: { id: userId },
   } = useContext(authContext)

   const { data, isLoading } = useQuery(getMessages(id))
   const { data: chatInfo, isLoading: chatInfoLoading } = useQuery(
      getContactInfo(id)
   )
   const mutation = useMutation(sendMessage(id))

   const handleSubmit = message => {
      mutation.mutate({ receiverId: id, ...message })
   }

   useEffect(() => {
      if (data && data.length > 0) {
         messageBox.current.scrollTop = messageBox.current.scrollHeight
      }
   }, [data])

   return (
      <section id='message' className='grid grid-cols-[5fr_3fr] grid-rows-1'>
         <div className='flex-col flex dark:bg-base-200'>
            <Title {...chatInfo} isLoading={chatInfoLoading} />
            <div ref={messageBox} className='py-2 overflow-y-auto'>
               {isLoading ? (
                  <div>Loading... </div>
               ) : (
                  data.map(message => (
                     <ChatBubble
                        key={message.id}
                        details={false}
                        createdAt={message.createdAt}
                        images={message.images}
                        text={message.text}
                        type={userId === message.sender ? 'sent' : 'received'}
                     />
                  ))
               )}
            </div>
            <ChatForm key={id} handleSubmit={handleSubmit} />
         </div>
         <Info chatInfo={chatInfo} loading={chatInfoLoading} />
      </section>
   )
}
export default Message
