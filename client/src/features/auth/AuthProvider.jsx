import { useState } from 'react'
import authContext from './authContext'
import api from '../../services/api'

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
   const [account, setAccount] = useState(null)
   const [loading, setLoading] = useState(null)
   const [error, setError] = useState(null)

   const login = async (payload, cb) => {
      try {
         setError(null)
         setLoading(true)
         const response = await api.post('auth/login', payload)
         setAccount(response.account)
         cb?.()
      } catch (error) {
         setError(error)
      } finally {
         setLoading(false)
      }
   }

   const signup = async (payload, cb) => {
      try {
         setError(false)
         setLoading(true)
         const response = await api.post('user', payload)
         setAccount(response.account)
         cb?.()
      } catch (error) {
         setError(error)
      } finally {
         setLoading(false)
      }
   }

   const value = {
      account,
      loading,
      error,
      login,
      signup,
   }

   return <authContext.Provider value={value}>{children}</authContext.Provider>
}
export default AuthProvider
