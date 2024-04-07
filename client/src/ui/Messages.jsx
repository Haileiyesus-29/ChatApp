import ChatTitle from '@/components/ChatTitle'
import PersonalChatBubble from '@/components/PersonalChatBubble'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAuth from '@/store/useAuth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext, useParams } from 'react-router-dom'

function Messages() {
   const { id } = useParams()
   const { account } = useAuth(store => store)
   const { messages, fetchChatThread, chatList, sendMessage } =
      useOutletContext()
   useEffect(() => {
      if (!messages[id]) fetchChatThread(id)
   }, [fetchChatThread, id, messages])

   const user = chatList.find(chat => chat.id === id) ?? {}

   const {
      register,
      handleSubmit,
      setValue,
      formState: { isSubmitting },
   } = useForm({ defaultValues: { text: '' } })

   const onSubmit = async data => {
      await sendMessage({ recipientId: id, message: data })
      setValue('text', '')
   }

   const showForm = user.type !== 'channel' || user?.ownerId === account.id

   return (
      <main className='flex flex-col justify-between gap-1 h-full overflow-hidden'>
         <ChatTitle user={user} />
         <section className='flex flex-col justify-end items-start bg-zinc-900 p-2 oveflow-y-auto grow'>
            {messages[id]?.map(message => (
               <PersonalChatBubble key={message.id} message={message} />
            ))}
         </section>
         {showForm && (
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='flex items-center gap-1 px-1'
            >
               <Input
                  {...register('text', { required: true })}
                  autoComplete='off'
                  placeholder='Write you message here..'
               />
               <Button
                  disabled={isSubmitting}
                  type='submit'
                  variant='secondary'
               >
                  Send
               </Button>
            </form>
         )}
      </main>
   )
}
export default Messages
