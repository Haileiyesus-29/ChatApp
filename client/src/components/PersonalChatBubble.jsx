import useAuth from '@/store/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import paths from '@/paths'

/* eslint-disable react/prop-types */
function PersonalChatBubble({ message }) {
   const { account } = useAuth(store => store)
   const sent = message.sender === account.id

   const setClassName = sent =>
      `flex items-end gap-2 my-1 px-3 py-2 max-w-md ${
         sent
            ? 'bg-zinc-200 rounded-s-lg rounded-tr-lg text-zinc-900 self-end'
            : 'bg-zinc-700/70 rounded-e-lg rounded-tl-lg'
      }`

   if (message.type === 'date')
      return (
         <span className='bg-zinc-950 px-6 py-1 rounded-full text-sm self-center'>
            March 28
         </span>
      )

   if (message.type === 'group' && !sent)
      return (
         <div className='flex items-end gap-2'>
            <Link to={paths.chatMessage(message.user.id)} className='py-1'>
               <Avatar className='w-10 h-10'>
                  <AvatarImage
                     src='https://github.com/shadcn.png'
                     alt='@shadcn'
                  />
                  <AvatarFallback>Profile Image</AvatarFallback>
               </Avatar>
            </Link>
            <div className=''>
               <h4 className='text-sm font-semibold text-zinc-300/80'>
                  {message.user.name}
               </h4>
               <div className={setClassName(sent)}>
                  <p className='grow'>{message.text}</p>
                  <span
                     className={`text-xs ${
                        sent ? 'text-zinc-900/80' : 'text-zinc-200/80'
                     }`}
                  >
                     {new Date(message.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                     })}
                  </span>
               </div>
            </div>
         </div>
      )

   return (
      <div className={setClassName(sent)}>
         <p className='grow'>{message.text}</p>
         <span
            className={`text-xs ${
               sent ? 'text-zinc-900/80' : 'text-zinc-200/80'
            }`}
         >
            {new Date(message.createdAt).toLocaleTimeString('en-US', {
               hour: '2-digit',
               minute: '2-digit',
            })}
         </span>
      </div>
   )
}
export default PersonalChatBubble

// return (
//    <div className={setClassName(sent)}>
//       <p className='grow'>{message.text}</p>
//       <span
//          className={`text-xs ${
//             sent ? 'text-zinc-900/80' : 'text-zinc-200/80'
//          }`}
//       >
//          {new Date(message.createdAt).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//          })}
//       </span>
//    </div>
// )
