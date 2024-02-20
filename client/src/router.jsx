import { Navigate, createBrowserRouter } from 'react-router-dom'
import Container from './ui/layout/Container'
import Chat from './features/chat/Chat'
import Group from './features/group/Group'
import Channel from './features/channel/Channel'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import NotFound from './ui/layout/NotFound'

const router = createBrowserRouter([
   {
      path: '/',
      element: <Container />,
      children: [
         {
            path: '/',
            element: <Navigate to='/chat' />,
         },
         {
            path: '/chat/*',
            element: <Chat />,
         },
         {
            path: '/group/*',
            element: <Group />,
         },
         {
            path: '/channel/*',
            element: <Channel />,
         },
      ],
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/register',
      element: <Register />,
   },
   {
      path: '*',
      element: <NotFound />,
   },
])

export default router
