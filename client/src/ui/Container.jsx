/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import NavLinks from '@/components/NavLinks'
import useAuth from '@/store/useAuth'
import { useEffect } from 'react'
import Provider from '@/Provider'

function Container() {
   const { loading, account, verify } = useAuth(state => state)

   useEffect(() => {
      verify()
   }, [verify])

   const renderMainComponents = () => (
      <>
         <Header />
         <NavLinks />
         <Outlet />
      </>
   )
   const renderLoading = () => <div>Loading...</div>

   if (!loading && !account) return <Navigate to='/login' />
   return (
      <Provider>
         <div className='grid grid-cols-[min-content,1fr] grid-rows-[min-content,1fr] bg-black mx-auto lg:rounded-xl w-full max-w-screen-lg h-full overflow-hidden'>
            {loading ? renderLoading() : renderMainComponents()}
         </div>
      </Provider>
   )
}
export default Container
