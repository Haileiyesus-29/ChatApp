import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'
import ChatProvider from '../../features/chat/ChatProvider'
import SocketProvider from '../../features/socket-io/SocketProvider'

function Container() {
   return (
      <SocketProvider>
         <ChatProvider>
            <div className='flex h-screen max-w-screen-2xl mx-auto'>
               <Sidenav />
               <Outlet />
            </div>
         </ChatProvider>
      </SocketProvider>
   )
}
export default Container
