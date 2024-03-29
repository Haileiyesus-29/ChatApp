import { createBrowserRouter } from 'react-router-dom'
import Container from '@/ui/Container'
import ChatList from '@/ui/ChatList'
import Messages from '@/ui/Messages'
import CreateForm from '@/ui/CreateForm'

const routes = createBrowserRouter([
   {
      path: '/',
      element: <Container />,
      children: [
         {
            path: '/',
            element: <ChatList />,
         },
         {
            path: '/chat',
            element: <ChatList />,
         },
         {
            path: '/chat/:id',
            element: <Messages />,
         },
         {
            path: '/group',
            element: <ChatList />,
         },
         {
            path: '/group/:id',
            element: <Messages />,
         },
         {
            path: '/channel',
            element: <ChatList />,
         },
         {
            path: '/channel/:id',
            element: <Messages />,
         },
         {
            path: '/new',
            element: <CreateForm />,
         },
         {
            path: '/profile',
            element: <div>Profile</div>,
         },
         {
            path: '/setting',
            element: <div>Setting</div>,
         },
      ],
   },
   {
      path: '/login',
      element: <div>Login</div>,
   },
   {
      path: '/register',
      element: <div>Register</div>,
   },
   {
      path: '*',
      element: <div>404</div>,
   },
])

export default routes
