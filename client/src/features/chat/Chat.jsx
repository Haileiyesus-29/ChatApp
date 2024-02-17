import { useParams } from 'react-router-dom'
import Sidebar from '../../ui/layout/Sidebar'
import Message from '../../ui/messaging/Message'
import { useContext, useEffect, useState } from 'react'
import chatContext from './chatContext'

function Chat() {
   const { '*': id } = useParams()
   const [messages, setMessages] = useState([])
   const [info, setInfo] = useState(null)

   const {
      chatList,
      chatListLoading,
      fetchMessages,
      getContactInfo,
      sendMessage,
   } = useContext(chatContext)

   const handleSubmit = async message => {
      if (!id) return
      const payload = Object.assign(message, { receiverId: id })
      await sendMessage(payload)
   }

   useEffect(() => {
      const loadMessages = async () => {
         if (id) {
            const response = await fetchMessages(id)
            setMessages(response)
         }
      }
      const loadInfo = async () => {
         if (id) {
            const response = await getContactInfo(id)
            setInfo(response)
         }
      }
      loadMessages()
      loadInfo()
   }, [id, fetchMessages, getContactInfo])

   return (
      <main className='grow grid grid-rows-1 grid-cols-[minmax(18rem,22rem)_minmax(40rem,1fr)]'>
         <Sidebar data={chatList} loading={chatListLoading} link='chat' />
         {id && (
            <Message messages={messages} onMessage={handleSubmit} info={info} />
         )}

         {!id && <div>select contact to start chatting. </div>}
      </main>
   )
}

export default Chat
