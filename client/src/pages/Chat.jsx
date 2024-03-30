import { Outlet } from 'react-router-dom'

function Chat() {
   return <Outlet context={{ count: 5 }} />
}
export default Chat
