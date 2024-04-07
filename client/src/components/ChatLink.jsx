/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import paths from '@/paths'
import { Check, CheckCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

function ChatLink({ user }) {
   const currentDate = new Date()
   const messageDate = new Date(user.lastMessage?.createdAt)

   let displayText
   if (currentDate.toDateString() === messageDate.toDateString()) {
      const options = { hour: 'numeric', minute: 'numeric' }
      displayText = messageDate.toLocaleTimeString('en-US', options)
   } else {
      const options = { weekday: 'short' }
      displayText = messageDate.toLocaleDateString('en-US', options)
   }

   return (
      <Link
         to={paths.chatMessage(user.id)}
         className='relative flex items-center gap-2 bg-zinc-950 py-2 pr-10 pl-4 rounded-lg overflow-hidden shrink-0'
      >
         <Avatar className='w-12 h-12'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>Profile Image</AvatarFallback>
         </Avatar>
         <div className='flex flex-col justify-between overflow-hidden'>
            <span className='top-1 right-4 absolute text-sm text-zinc-50/50 capitalize'>
               {displayText}
            </span>
            {/* <span className='right-4 bottom-1 absolute text-sm text-zinc-50/50 capitalize'>
               <CheckCheck />
               <Check />
            </span> */}

            <h3 className='text-lg'>Mike Tyson</h3>
            <p className='text-zinc-100/60 truncate leading-none overflow-hidden'>
               {user.lastMessage?.text}
            </p>
         </div>
      </Link>
   )
}
export default ChatLink
