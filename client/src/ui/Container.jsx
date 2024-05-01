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

   // TODO: Create a loading component
   const renderLoading = () => (
      <div className='bg-black mx-auto lg:rounded-xl w-full max-w-screen-lg h-full overflow-hidden'>
         <div className='flex justify-center items-center w-full h-full'>
            <div className='flex flex-col justify-center items-center'>
               <div className='border-gray-900 border-t-2 border-b-2 rounded-full w-32 h-32 animate-spin'></div>
            </div>
         </div>
      </div>
   )

   if (loading) return renderLoading()
   if (!account) return <Navigate to='/login' />

   return (
      <Provider>
         <div className='grid grid-cols-[min-content,1fr] grid-rows-[min-content,1fr] bg-black mx-auto lg:rounded-xl w-full max-w-screen-lg h-full overflow-hidden'>
            {renderMainComponents()}
         </div>
      </Provider>
   )
}
export default Container
