import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../ui/layout/Sidebar'
import Message from '../../ui/messaging/Message'

function ChatRoutes() {
   return (
      <main className='grow grid grid-rows-1 grid-cols-[minmax(18rem,22rem)_minmax(24rem,1fr)_minmax(18rem,24rem)]'>
         <Sidebar />
         <Routes>
            <Route
               index
               element={<div>select contact to start chatting. </div>}
            />
            <Route path='/:id' element={<Message />} />
         </Routes>
      </main>
   )
}
export default ChatRoutes
