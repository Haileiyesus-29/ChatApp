import { useEffect, useState } from 'react'
import authContext from './authContext'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
   const [account, setAccount] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      const verifyAuth = async () => {
         try {
            setLoading(true)
            const response = await api.post('auth/verify')
            setLoading(false)
            setAccount(response.data)
         } catch (error) {
            setLoading(false)
            navigate('/login')
         }
      }
      verifyAuth()
   }, [navigate])

   const login = async payload => {
      try {
         setLoading(true)
         const response = await api.post('auth/login', payload)
         setAccount(response.data)
         setLoading(false)
         navigate('/')
      } catch (error) {
         setLoading(false)
         console.log(error)
      }
   }
   const logout = async () => {
      try {
         await api.post('auth/logout')
         setAccount(null)
         navigate('/login')
      } catch (error) {
         console.log(error)
      }
   }

   const signup = async payload => {
      try {
         setLoading(true)
         const response = await api.post('user', payload)
         setAccount(response.data)
         setLoading(false)
         navigate('/')
      } catch (error) {
         setLoading(false)
         console.log(error)
      }
   }

   const value = { account, loading, login, signup, logout, error }
   return <authContext.Provider value={value}>{children}</authContext.Provider>
}
export default AuthProvider
