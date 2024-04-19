/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'
import { Send, CirclePlus } from 'lucide-react'
import paths from '@/paths'
import useGroup from '@/store/useGroup'
import useChannel from '@/store/useChannel'

// eslint-disable-next-line react/prop-types
function SearchResult({ type = 'user', account, setSearchInput }) {
   const navigate = useNavigate()
   const { joinGroup } = useGroup(store => store)
   const { joinChannel } = useChannel(store => store)

   const onJoin = async () => {
      if (type === 'group') {
         await joinGroup({ groupId: account.id }, () =>
            navigate(paths.groupMessage(account.id))
         )
         setSearchInput('')
      }
      if (type === 'channel') {
         await joinChannel({ channelId: account.id }, () =>
            navigate(paths.channelMessage(account.id))
         )
         setSearchInput('')
      }
   }

   return (
      <li className='flex items-center gap-2 bg-zinc-950 p-2 rounded-md'>
         <Avatar className='w-12 h-12'>
            <AvatarImage
               src='https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
               className='w-full h-full object-cover'
               alt='@shadcn'
            />
         </Avatar>
         <div className='flex flex-col justify-between'>
            <p className='font-semibold text-zinc-50'>{account.name}</p>
            <span className='text-sm text-zinc-50/60'>@{account.username}</span>
         </div>

         {type === 'user' ? (
            <span
               className='ml-auto px-3 hover:text-blue-500 transition cursor-pointer'
               onClick={() => {
                  setSearchInput('')
                  navigate(paths.chatMessage(account.id))
               }}
            >
               <Send />
            </span>
         ) : (
            <span
               className='ml-auto px-3 hover:text-blue-500 transition cursor-pointer'
               onClick={onJoin}
            >
               <CirclePlus />
            </span>
         )}
      </li>
   )
}
export default SearchResult
