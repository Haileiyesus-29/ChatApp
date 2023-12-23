import { Route, Routes } from 'react-router-dom'
import Container from './ui/Container'
import Message from './features/chat/Message'

function App() {
   return (
      <Routes>
         <Route path='/' element={<Container />}>
            <Route index element={<Message />} />
            <Route path='chat/:userId' element={<Message />} />
         </Route>
      </Routes>
   )
}

export default App
