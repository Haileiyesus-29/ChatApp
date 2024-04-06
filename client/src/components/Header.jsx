import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAuth from '@/store/authStore'
import { Link } from 'react-router-dom'

function Header() {
   const { logout } = useAuth(state => state)

   return (
      <header className='flex justify-between items-center col-span-full px-3 py-1'>
         <h1 className='flex items-center gap-2 rounded-md font-semibold text-xl'>
            <Avatar className='w-14 h-14'>
               <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Mike Tyson</p>
         </h1>
         <Input
            placeholder='Search'
            className='focus-visible:outline-none focus:border-2 focus:border-zinc-500 px-6 rounded-full max-w-80'
         />
         <Button onClick={logout} variant='secondary'>
            Logout
         </Button>
      </header>
   )
}
export default Header
