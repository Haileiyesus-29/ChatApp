import useAuth from '@/store/useAuth'
import {
   ContactRound,
   LogOut,
   MessagesSquare,
   Podcast,
   Settings,
   SquarePen,
   User,
   Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

function NavLinks() {
   const { logout } = useAuth(store => store)

   const setClassName = ({ isActive }) =>
      `flex items-center gap-2  px-2 md:px-4 py-1 md:py-3 rounded text-zinc-50/80 cursor-pointer ${
         isActive ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-600/50'
      }`

   return (
      <aside className='flex flex-col justify-between px-2 py-8'>
         <ul className='flex flex-col gap-2'>
            <NavLink to='/' className={setClassName}>
               <MessagesSquare />
               <span className='sm:block hidden'>All Chats</span>
            </NavLink>
            <NavLink to='/chat' className={setClassName}>
               <ContactRound />
               <span className='sm:block hidden'>Personal</span>
            </NavLink>
            <NavLink to='/group' className={setClassName}>
               <Users />
               <span className='sm:block hidden'>Groups</span>
            </NavLink>
            <NavLink to='/channel' className={setClassName}>
               <Podcast />
               <span className='sm:block hidden'>Channels</span>
            </NavLink>
         </ul>
         <ul className='flex flex-col gap-2'>
            <NavLink to='/new' className={setClassName}>
               <SquarePen />
               <span className='sm:block hidden'>New</span>
            </NavLink>
            <NavLink to='/profile' className={setClassName}>
               <User />
               <span className='sm:block hidden'>Profile</span>
            </NavLink>
            <div
               onClick={logout}
               className='flex items-center gap-2 hover:bg-zinc-600/50 px-2 md:px-4 py-1 md:py-3 rounded text-zinc-50/80 cursor-pointer'
            >
               <LogOut />
               <span className='sm:block hidden'>Logout</span>
            </div>
         </ul>
      </aside>
   )
}
export default NavLinks
