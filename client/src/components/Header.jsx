import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { ENDPOINT } from '@/endpoints'
import api from '@/services/api'
import useAuth from '@/store/useAuth'
import Search from '@/ui/Search'
import { useEffect, useState } from 'react'

function Header() {
   const { account } = useAuth(state => state)
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
      <header className='relative flex justify-between items-center gap-2 col-span-full px-3 py-2'>
         <h1 className='flex items-center gap-2 rounded-md font shrink-0 text'>
            <Avatar className='w-10 h-10'>
               <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='md:block hidden'>{account.name}</p>
         </h1>
         <Input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder='Search'
            className='focus-visible:outline-none order-1 focus:border-2 focus:border-zinc-500 mx-auto px-6 rounded-full max-w-80'
         />
         {searchInput && (
            <div className='top-full left-1/2 z-20 absolute w-11/12 max-w-md h-[90svh] transition-all -translate-x-1/2 md:-translate-x-28'>
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
