/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import paths from '@/paths'

function ChatTitle({ user }) {
   return (
      <section className='flex justify-between items-center gap-2 bg-zinc-950 p-2 rounded-t-lg'>
         <Avatar className='w-12 h-12'>
            <AvatarImage
               src={user?.image || 'default_profile.jpg'}
               alt={user?.name}
            />
            <AvatarFallback>Profile Image</AvatarFallback>
         </Avatar>
         <Link
            to={paths.about(user?.id, user?.type || 'chat')}
            className='flex flex-col justify-between overflow-hidden grow'
         >
            <h3 className='text-lg'>{user?.name}</h3>
            <p className='text-zinc-100/60 truncate leading-none overflow-hidden'>
               Last seen 2 hours ago
            </p>
         </Link>
      </section>
   )
}
export default ChatTitle
