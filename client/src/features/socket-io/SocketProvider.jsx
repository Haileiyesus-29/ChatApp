import { useContext, useEffect, useRef, useState } from 'react'
import socketContext from './socketContext'
import { io } from 'socket.io-client'
import authContext from '../auth/authContext'

const ENDPOINT = 'http://localhost:5000'

// eslint-disable-next-line react/prop-types
export default function SocketProvider({ children }) {
   const socket = useRef(null)
   const { loading, account } = useContext(authContext)

   const [connected, setConnected] = useState(false)
   useEffect(() => {
      if (!loading && account) {
         socket.current = io(ENDPOINT)
      }
      socket.current?.on('connect', () => {
         console.log('connected')
         setConnected(true)
      })

      socket.current?.on('disconnect', () => {
         console.log('disconnected')
         setConnected(false)
      })

      return () => {
         if (socket.current) {
            socket.current.disconnect()
         }
      }
   }, [loading, account])

   const emit = (connection, payload) => {
      if (socket.current) {
         socket.current.emit(connection, payload)
      }
   }

   const value = {
      connected,
      emit,
      socket: socket.current,
   }

   return (
      <socketContext.Provider value={value}>{children}</socketContext.Provider>
   )
}
