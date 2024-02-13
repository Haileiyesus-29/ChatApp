import { createBrowserRouter } from 'react-router-dom'
import Container from './ui/layout/Container'
import Chat from './features/chat/Chat'
import Group from './features/group/Group'
import Channel from './features/channel/Channel'
import Profile from './features/profile/Profile'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import NotFound from './ui/layout/NotFound'

const router = createBrowserRouter([
   {
      path: '/',
      element: <Container />,
      children: [
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
         {
            path: '/profile',
            element: <Profile />,
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
