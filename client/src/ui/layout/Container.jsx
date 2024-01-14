import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'
import ChatProvider from '../../features/chat/ChatProvider'

function Container() {
   return (
      <ChatProvider>
         <div className='flex h-screen max-w-screen-2xl mx-auto'>
            <Sidenav />
            <Outlet />
         </div>
      </ChatProvider>
   )
}
export default Container
