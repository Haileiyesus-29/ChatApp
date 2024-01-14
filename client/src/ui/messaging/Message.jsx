import { useParams } from 'react-router-dom'
import ChatBubble from './ChatBubble'
import ChatForm from './ChatForm'
import Info from './Info'
import Title from './Title'
import { useQuery } from '@tanstack/react-query'

// eslint-disable-next-line react/prop-types
function Message({ getMessages, getContactInfo }) {
   const { id } = useParams()
   const { data, isLoading } = useQuery(getMessages(id))
   const { data: chatInfo, isLoading: chatInfoLoading } = useQuery(
      getContactInfo(id)
   )

   return (
      <section className='grid grid-cols-[5fr_3fr] grid-rows-1'>
         <div className='flex-col flex dark:bg-base-200'>
            <Title {...chatInfo?.account} isLoading={chatInfoLoading} />
            <div className='py-2 overflow-y-auto'>
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
                        type={id === message.receiver ? 'received' : 'sent'}
                     />
                  ))
               )}
            </div>
            <ChatForm key={id} />
         </div>
         <Info chatInfo={chatInfo?.account} loading={chatInfoLoading} />
      </section>
   )
}
export default Message
