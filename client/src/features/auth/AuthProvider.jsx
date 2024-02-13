import { useEffect, useState } from 'react'
import authContext from './authContext'
import api from '../../services/api'

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
   const [account, setAccount] = useState(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      console.log("I'm gonna out here if this is going to be re-rendered")
      const verifyAuth = async () => {
         try {
            setLoading(true)
            const response = await api.post('auth/verify')
            setAccount(response.data)
         } catch (error) {
            console.error(error)
         } finally {
            setLoading(false)
         }
      }
      verifyAuth()
   }, [])

   const login = async (payload, callback) => {
      try {
         setLoading(true)
         const response = await api.post('auth/login', payload)
         setAccount(response.data)
         setLoading(false)
         callback?.()
      } catch (error) {
         setLoading(false)
         console.log(error)
      }
   }

   const logout = async callback => {
      try {
         await api.post('auth/logout')
         setAccount(null)
         callback?.()
      } catch (error) {
         console.log(error)
      }
   }

   const signup = async (payload, callback) => {
      try {
         setLoading(true)
         const response = await api.post('user', payload)
         setAccount(response.data)
         setLoading(false)
         callback?.()
      } catch (error) {
         setLoading(false)
         console.log(error)
      }
   }

   const value = { account, loading, login, signup, logout }
   return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthProvider
