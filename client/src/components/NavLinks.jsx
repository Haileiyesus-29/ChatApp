import {
   ContactRound,
   MessagesSquare,
   Podcast,
   Settings,
   SquarePen,
   User,
   Users,
} from 'lucide-react'

function NavLinks() {
   const setClassName = active =>
      `flex items-center gap-2  px-4 py-3 rounded text-zinc-50/80 cursor-pointer ${
         active ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-600/50'
      }`

   return (
      <aside className='flex flex-col justify-between px-2 py-8'>
         <ul className='flex flex-col gap-2'>
            <li className={setClassName(true)}>
               <MessagesSquare />
               <span>All Chats</span>
            </li>
            <li className={setClassName(false)}>
               <ContactRound />
               <span>Personal</span>
            </li>
            <li className={setClassName(false)}>
               <Users />
               <span>Groups</span>
            </li>
            <li className={setClassName(false)}>
               <Podcast />
               <span>Channels</span>
            </li>
         </ul>
         <ul className='flex flex-col gap-2'>
            <li className={setClassName(false)}>
               <SquarePen />
               <span>New</span>
            </li>
            <li className={setClassName(false)}>
               <User />
               <span>Profile</span>
            </li>
            <li className={setClassName(false)}>
               <Settings />
               <span>Settings</span>
            </li>
         </ul>
      </aside>
   )
}
export default NavLinks
