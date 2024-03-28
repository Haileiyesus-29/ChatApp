import {
   ContactRound,
   MessagesSquare,
   Podcast,
   Settings,
   User,
   Users,
} from 'lucide-react'

function NavLinks() {
   return (
      <aside className='flex flex-col justify-between px-2 py-8'>
         <ul className='flex flex-col gap-2'>
            <li className='flex items-center gap-2 hover:bg-zinc-800/60 px-4 py-3 rounded text-zinc-50/80 cursor-pointer'>
               <MessagesSquare />
               <span>All Chats</span>
            </li>
            <li className='flex items-center gap-2 hover:bg-zinc-800/60 px-4 py-3 rounded text-zinc-50/80 cursor-pointer'>
               <ContactRound />
               <span>Personal</span>
            </li>
            <li className='flex items-center gap-2 hover:bg-zinc-800/60 px-4 py-3 rounded text-zinc-50/80 cursor-pointer'>
               <Users />
               <span>Groups</span>
            </li>
            <li className='flex items-center gap-2 hover:bg-zinc-800/60 px-4 py-3 rounded text-zinc-50/80 cursor-pointer'>
               <Podcast />
               <span>Channels</span>
            </li>
         </ul>
         <ul className='flex flex-col gap-2'>
            <li className='flex items-center gap-2 hover:bg-zinc-800/60 px-4 py-3 rounded text-zinc-50/80 cursor-pointer'>
               <User />
               <span>Profile</span>
            </li>
            <li className='flex items-center gap-2 hover:bg-zinc-800/60 px-4 py-3 rounded text-zinc-50/80 cursor-pointer'>
               <Settings />
               <span>Settings</span>
            </li>
         </ul>
      </aside>
   )
}
export default NavLinks
