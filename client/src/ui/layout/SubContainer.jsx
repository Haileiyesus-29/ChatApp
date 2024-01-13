import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import Message from '../messaging/Message'
import Info from '../messaging/Info'
// import NotFound from './NotFound'

function SubContainer() {
   return (
      <main className='grow grid grid-rows-1 grid-cols-[minmax(18rem,22rem)_minmax(24rem,1fr)_minmax(18rem,24rem)]'>
         <Sidebar />
         <Routes>
            <Route
               index
               element={<div>select contact to start chatting. </div>}
            />
            <Route
               path='/:id'
               element={
                  <>
                     <Message />
                     <Info />
                  </>
               }
            />
            {/* <Route path='*' element={<NotFound />} /> */}
         </Routes>
      </main>
   )
}
export default SubContainer
