import {
   ContactRound,
   MessagesSquare,
   Podcast,
   Settings,
   SquarePen,
   User,
   Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

function NavLinks() {
   const setClassName = ({ isActive }) =>
      `flex items-center gap-2  px-4 py-3 rounded text-zinc-50/80 cursor-pointer ${
         isActive ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-600/50'
      }`

   return (
      <aside className='flex flex-col justify-between px-2 py-8'>
         <ul className='flex flex-col gap-2'>
            <NavLink to='/' className={setClassName}>
               <MessagesSquare />
               <span className='md:block hidden'>All Chats</span>
            </NavLink>
            <NavLink to='/chat' className={setClassName}>
               <ContactRound />
               <span className='md:block hidden'>Personal</span>
            </NavLink>
            <NavLink to='/group' className={setClassName}>
               <Users />
               <span className='md:block hidden'>Groups</span>
            </NavLink>
            <NavLink to='/channel' className={setClassName}>
               <Podcast />
               <span className='md:block hidden'>Channels</span>
            </NavLink>
         </ul>
         <ul className='flex flex-col gap-2'>
            <NavLink to='/new' className={setClassName}>
               <SquarePen />
               <span className='md:block hidden'>New</span>
            </NavLink>
            <NavLink to='/profile' className={setClassName}>
               <User />
               <span className='md:block hidden'>Profile</span>
            </NavLink>
            {/* <NavLink to='/setting' className={setClassName}>
               <Settings />
               <span>Settings</span>
            </NavLink> */}
         </ul>
      </aside>
   )
}
export default NavLinks
