import { Route, Routes } from 'react-router-dom'

import Container from './ui/layout/Container'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import NotFound from './ui/layout/NotFound'
import AuthProvider from './features/auth/AuthProvider'
import Chat from './features/chat/Chat'
import Group from './features/group/Group'
import Channel from './features/channel/Channel'
import Profile from './features/profile/Profile'

function App() {
   return (
      <AuthProvider>
         <Routes>
            <Route path='/' element={<Container />}>
               <Route path='/chat/*' element={<Chat />} />
               <Route path='/group/*' element={<Group />} />
               <Route path='/channel/*' element={<Channel />} />
               <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
      </AuthProvider>
   )
}

export default App
