import { RouterProvider } from 'react-router-dom'
import router from './router'
import AuthProvider from './features/auth/AuthProvider'
import SocketProvider from './features/socket-io/SocketProvider'

function App() {
   return (
      <AuthProvider>
         <SocketProvider>
            <RouterProvider router={router} />
         </SocketProvider>
      </AuthProvider>
   )
}
export default App
