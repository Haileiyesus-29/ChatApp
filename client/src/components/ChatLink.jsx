import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function ChatLink() {
   return (
      <div className='relative flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-lg overflow-hidden shrink-0'>
         <Avatar className='w-12 h-12'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
         </Avatar>
         <div className='flex flex-col justify-between overflow-hidden'>
            <span className='top-1 right-4 absolute text-sm text-zinc-50/50 capitalize'>
               wed
            </span>
            <h3 className='text-lg'>Mike Tyson</h3>
            <p className='text-zinc-100/60 truncate leading-none overflow-hidden'>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
               pariatur rerum exercitationem!
            </p>
         </div>
      </div>
   )
}
export default ChatLink
