import {
   ContactRound,
   MessagesSquare,
   Podcast,
   Settings,
   SquarePen,
   User,
   Users,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

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
               <span>All Chats</span>
            </NavLink>
            <NavLink to='/chat' className={setClassName}>
               <ContactRound />
               <span>Personal</span>
            </NavLink>
            <NavLink to='/group' className={setClassName}>
               <Users />
               <span>Groups</span>
            </NavLink>
            <NavLink to='/channel' className={setClassName}>
               <Podcast />
               <span>Channels</span>
            </NavLink>
         </ul>
         <ul className='flex flex-col gap-2'>
            <NavLink to='/new' className={setClassName}>
               <SquarePen />
               <span>New</span>
            </NavLink>
            <NavLink to='/profile' className={setClassName}>
               <User />
               <span>Profile</span>
            </NavLink>
            <NavLink to='/setting' className={setClassName}>
               <Settings />
               <span>Settings</span>
            </NavLink>
         </ul>
      </aside>
   )
}
export default NavLinks
