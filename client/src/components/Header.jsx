import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import useAuth from '@/store/useAuth'
import Search from '@/ui/Search'
import { useEffect, useState } from 'react'

function Header() {
   const { logout } = useAuth(state => state)
   const [searchInput, setSearchInput] = useState('')
   const [searchResults, setSearchResults] = useState({
      users: [],
      groups: [],
      channels: [],
   })
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      const fetchResults = async () => {
         try {
            setLoading(true)
            const response = await api.get(ENDPOINT.SEARCH(searchInput))
            setSearchResults(response.data)
         } catch (error) {
            console.error(error)
         } finally {
            setLoading(false)
         }
      }

      const timer = setTimeout(() => {
         if (searchInput) {
            fetchResults()
         } else {
            setSearchResults({ users: [], groups: [], channels: [] })
         }
      }, 500)

      return () => clearTimeout(timer)
   }, [searchInput])

   return (
      <header className='relative flex justify-between items-center col-span-full px-3 py-1'>
         <h1 className='flex items-center gap-2 rounded-md font-semibold text-xl'>
            <Avatar className='w-14 h-14'>
               <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Mike Tyson</p>
         </h1>
         <Input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder='Search'
            className='focus-visible:outline-none focus:border-2 focus:border-zinc-500 px-6 rounded-full max-w-80'
         />
         <Button onClick={logout} variant='secondary'>
            Logout
         </Button>
         {searchInput && (
            <div className='top-full right-32 z-10 absolute m-4 w-full max-w-md h-[80svh] transition-all'>
               <Search
                  searchResults={searchResults}
                  loading={loading}
                  setSearchInput={setSearchInput}
               />
            </div>
         )}
      </header>
   )
}
export default Header
