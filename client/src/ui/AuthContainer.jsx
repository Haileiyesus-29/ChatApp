import useAuth from '@/store/useAuth'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function AuthContainer({ children }) {
   const { account, loading, verify } = useAuth(store => store)

   useEffect(() => {
      if (!account) verify()
   }, [account, verify])

   if (account && !loading) return <Navigate to='/' />
   return (
      <main className='flex justify-center items-center bg-black mx-auto p-4 rounded-xl w-full max-w-screen-lg h-full overflow-hidden'>
         {children}
      </main>
   )
}
export default AuthContainer
