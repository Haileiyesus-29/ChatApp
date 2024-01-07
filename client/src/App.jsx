import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, Routes } from 'react-router-dom'

import Container from './ui/layout/Container'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import NotFound from './ui/layout/NotFound'
import AuthProvider from './features/auth/AuthProvider'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 30 * 1000,
      },
   },
})

function App() {
   return (
      <AuthProvider>
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <Routes>
               <Route path='/' element={<Container />} />
               <Route path='/chat' element={<Container />} />
               <Route path='/group' element={<Container />} />
               <Route path='/channel' element={<Container />} />
               <Route path='/info' element={<Container />} />
               <Route path='/profile' element={<Container />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
               <Route path='*' element={<NotFound />} />
            </Routes>
         </QueryClientProvider>
      </AuthProvider>
   )
}

export default App
