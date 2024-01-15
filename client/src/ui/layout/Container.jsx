import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'
import ChatProvider from '../../features/chat/ChatProvider'
import SocketProvider from '../../features/socket-io/SocketProvider'
import GroupProvider from '../../features/group/GroupProvider'

function Container() {
   return (
      <SocketProvider>
         <ChatProvider>
            <GroupProvider>
               <div className='flex h-screen max-w-screen-2xl mx-auto'>
                  <Sidenav />
                  <Outlet />
               </div>
            </GroupProvider>
         </ChatProvider>
      </SocketProvider>
   )
}
export default Container
