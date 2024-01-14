import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../ui/layout/Sidebar'
import Message from '../../ui/messaging/Message'
import { useContext } from 'react'
import chatContext from './chatContext'

function Chat() {
   const { chatList, chatListLoading, getMessages, getContactInfo } =
      useContext(chatContext)
   return (
      <main className='grow grid grid-rows-1 grid-cols-[minmax(18rem,22rem)_minmax(40rem,1fr)]'>
         <Sidebar data={chatList} loading={chatListLoading} />
         <Routes>
            <Route
               index
               element={<div>select contact to start chatting. </div>}
            />
            <Route
               path='/:id'
               element={
                  <Message
                     getMessages={getMessages}
                     getContactInfo={getContactInfo}
                  />
               }
            />
         </Routes>
      </main>
   )
}

export default Chat
