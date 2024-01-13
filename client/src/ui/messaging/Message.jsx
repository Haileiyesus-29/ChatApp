import { useLocation, useParams } from 'react-router-dom'
import useSocket from '../../hooks/useSocket'
import ChatBubble from './ChatBubble'
import ChatForm from './ChatForm'
import ChatStatus from './ChatStatus'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

function Message() {
   const { data, emit, error } = useSocket('connection')
   if (data) console.log(data)
   if (error) console.log(error)
   const { pathname, state } = useLocation()
   const { id } = useParams()

   const page = pathname.split('/')[1]

   const { data: messages, isLoading } = useQuery({
      queryKey: [page, id],
      queryFn: async () => {
         const messages = id && (await api.get(`chat/${id}`))
         return messages
      },
   })
   const { data: accountData, isLoading: accountLoading } = useQuery({
      queryKey: ['user', id],
      queryFn: async () => {
         const user = id && (await api.get(`user/${id}`))
         return user
      },
   })
   return (
      <section className='flex-col flex h-full grow dark:bg-base-200'>
         {id ? (
            <>
               <ChatStatus
                  page={page}
                  {...accountData?.account}
                  isLoading={accountLoading}
               />
               {isLoading ? (
                  <div>Loading... </div>
               ) : (
                  <div className='py-2 overflow-y-auto'>
                     {messages.map(message => {
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
               <ChatForm key={id} />
            </>
         ) : (
            <div className='text-2xl'>Select chat</div>
         )}
      </section>
   )
}
export default Message
