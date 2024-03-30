/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import NavLinks from '@/components/NavLinks'
import useAuth from '@/store/authStore'
import { useEffect } from 'react'

function Container() {
   const { setAccount, setLoading, loading, account } = useAuth(state => state)

   useEffect(() => {
      const login = async () => {
         try {
            await new Promise(resolve => {
               setTimeout(() => {
                  resolve()
               }, 500)
            })
            setAccount({ name: 'John Doe' })
         } catch (error) {
            console.error(error)
         } finally {
            setLoading(false)
         }
      }
      login()
   }, [setAccount, setLoading])

   if (loading) return <div>Loading...</div>
   if (!account) return <Navigate to='/login' />

   return (
      <div className='gap-2 grid grid-cols-[minmax(4rem,_16rem),1fr] grid-rows-[min-content,1fr] bg-black mx-auto p-4 rounded-xl w-full max-w-screen-lg h-full overflow-hidden'>
         <Header />
         <NavLinks />
         <Outlet />
      </div>
   )
}
export default Container
