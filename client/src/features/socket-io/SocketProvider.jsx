import { useEffect, useState } from 'react'
import socketContext from './socketContext'
import { io } from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000' // Replace with Socket.IO server URL
const socket = io(ENDPOINT)

// eslint-disable-next-line react/prop-types
export default function SocketProvider({ children }) {
   const [connected, setConnected] = useState(false)
   useEffect(() => {
      socket.on('connect', () => {
         console.log('connected')
         setConnected(true)
      })

      socket.on('disconnect', () => {
         console.log('disconnected')
         setConnected(false)
      })

      return () => {
         socket.off('connect')
         socket.off('disconnect')
      }
   }, [])

   const emit = (connection, payload) => {
      socket.emit(connection, payload)
   }

   const value = {
      connected,
      emit,
      socket,
   }

   return (
      <socketContext.Provider value={value}>{children}</socketContext.Provider>
   )
}
