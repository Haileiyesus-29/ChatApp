import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import ChatLink from '../../ui/messaging/ChatLink'
import api from '../../services/api'

function ChatList() {
   const queryClient = useQueryClient()
   const { data, isLoading } = useQuery({
      queryKey: ['chat-list'],
      queryFn: async () => {
         const list = await api.get('chat')
         return list?.contacts
      },
   })

   // console.log(data)

   return (
      <section className='flex flex-col gap-1 overflow-y-scroll px-1'>
         {isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
               Loading...
            </div>
         ) : (
            data.map(chat => <ChatLink key={chat.id} chat={chat} />)
         )}
      </section>
   )
}
export default ChatList
