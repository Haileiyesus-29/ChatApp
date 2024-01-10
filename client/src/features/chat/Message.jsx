import { useLocation, useParams } from 'react-router-dom'
import useSocket from '../../hooks/useSocket'
import ChatBubble from '../../ui/messaging/ChatBubble'
import ChatForm from '../../ui/messaging/ChatForm'
import ChatStatus from './ChatStatus'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

function Message() {
   // const { data, emit, error } = useSocket('connection')
   // if (data) console.log(data)
   // if (error) console.log(error)
   const { pathname, state } = useLocation()
   const { id } = useParams()

   const page = pathname.split('/')[1]

   const { data, isLoading } = useQuery({
      queryKey: [page, id],
      queryFn: async () => {
         const messages = await api.get(`chat/${id}`)
         return messages
      },
   })

   return (
      <section className='flex-col flex h-full '>
         {id ? (
            <>
               <ChatStatus page={page} {...state} />
               {isLoading ? (
                  <div>Loading... </div>
               ) : (
                  <div className='py-2 overflow-y-auto'>
                     {data.map(message => {
                        return (
                           <ChatBubble
                              key={message.id}
                              type={
                                 id === message.receiver ? 'received' : 'sent'
                              }
                              details={page !== 'chat'}
                              {...message}
                           />
                        )
                     })}
                  </div>
               )}
               <ChatForm />
            </>
         ) : (
            <div className='text-2xl'>Select chat</div>
         )}
      </section>
   )
}
export default Message
