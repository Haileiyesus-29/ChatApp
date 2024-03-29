import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { EllipsisVertical } from 'lucide-react'

function ChatTitle() {
   return (
      <section className='flex justify-between items-center gap-2 bg-zinc-950 p-2 rounded-t-lg'>
         <Avatar className='w-12 h-12'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>Profile Image</AvatarFallback>
         </Avatar>
         <div className='flex flex-col justify-between overflow-hidden grow'>
            <h3 className='text-lg'>Mike Tyson</h3>
            <p className='text-zinc-100/60 truncate leading-none overflow-hidden'>
               Last seen 2 hours ago
            </p>
         </div>
         <div className='flex justify-center items-center hover:bg-zinc-700/70 rounded-sm w-8 h-8 cursor-pointer'>
            <EllipsisVertical />
         </div>
      </section>
   )
}
export default ChatTitle
