import useAuth from '@/store/authStore'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function AuthContainer({ children }) {
   const { setAccount, setLoading, loading, account } = useAuth(state => state)

   useEffect(() => {
      const login = async () => {
         try {
            await new Promise(resolve => {
               setTimeout(() => {
                  resolve()
               }, 2000)
            })
         } catch (error) {
            console.error(error)
         } finally {
            setLoading(false)
         }
      }
      login()
   }, [setAccount, setLoading])

   console.log('rendering container')

   // if (account) return <Navigate to='/' />
   return (
      <main className='flex justify-center items-center bg-black mx-auto p-4 rounded-xl w-full max-w-screen-lg h-full overflow-hidden'>
         {children}
      </main>
   )
}
export default AuthContainer
