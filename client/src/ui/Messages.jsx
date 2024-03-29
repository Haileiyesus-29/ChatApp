import ChatTitle from '@/components/ChatTitle'
import PersonalChatBubble from '@/components/PersonalChatBubble'
import { Input } from '@/components/ui/input'

function Messages() {
   return (
      <main className='flex flex-col justify-between gap-1 h-full overflow-hidden'>
         <ChatTitle />
         <section className='flex flex-col justify-end items-start bg-zinc-900 p-2 oveflow-y-auto grow'>
            <PersonalChatBubble sent={true} />
            <PersonalChatBubble sent={false} />
            <PersonalChatBubble date={true} />
            <PersonalChatBubble sent={true} />
            <PersonalChatBubble sent={false} />
            <PersonalChatBubble date={true} />
            <PersonalChatBubble sent={true} />
            <PersonalChatBubble sent={false} />
         </section>
         <section>
            <Input placeholder='Write you message here..' />
         </section>
      </main>
   )
}
export default Messages
