import { Navigate, Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'
import ChatProvider from '../../features/chat/ChatProvider'
import GroupProvider from '../../features/group/GroupProvider'
import { useContext } from 'react'
import authContext from '../../features/auth/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 30 * 1000,
      },
   },
})

function Container() {
   const { loading, account } = useContext(authContext)

   if (loading) return <div className='text-3xl font-bold'>Loading...</div>
   if (!account) return <Navigate to={'/login'} />
   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <ChatProvider>
            <GroupProvider>
               <div className='flex h-screen max-w-screen-2xl mx-auto'>
                  <Sidenav />
                  <Outlet />
               </div>
            </GroupProvider>
         </ChatProvider>
      </QueryClientProvider>
   )
}
export default Container
