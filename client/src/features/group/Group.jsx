import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../ui/layout/Sidebar'
import Message from '../../ui/messaging/Message'
import { useContext } from 'react'
import groupContext from './groupContext'

function Group() {
   const { chatList, chatListLoading } = useContext(groupContext)

   return (
      <main className='grow grid grid-rows-1 grid-cols-[minmax(18rem,22rem)_minmax(40rem,1fr)]'>
         <Sidebar data={chatList} loading={chatListLoading} />
         <Routes>
            <Route
               index
               element={<div>select contact to start chatting. </div>}
            />
            {/* <Route
               path='/:id'
               element={
                  <Message
                     getMessages={getMessages}
                     getContactInfo={getContactInfo}
                     sendMessage={sendMessage}
                  />
               }
            /> */}
         </Routes>
      </main>
   )
}

export default Group
