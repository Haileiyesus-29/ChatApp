import { useContext, useEffect, useRef, useState } from 'react'
import socketContext from './socketContext'
import { io } from 'socket.io-client'
import authContext from '../auth/authContext'

const ENDPOINT = import.meta.env.VITE_SERVER_ADDR

// eslint-disable-next-line react/prop-types
export default function SocketProvider({ children }) {
   const { account } = useContext(authContext)
   const [connected, setConnected] = useState(false)
   const socket = useRef(null)

   useEffect(() => {
      if (account) socket.current = io(ENDPOINT)
      else socket.current?.disconnect()
      socket.current?.on('connect', () => {
         console.log('connected')
         setConnected(true)
      })

      socket.current?.on('disconnect', () => {
         console.log('disconnected')
         setConnected(false)
      })
      return () => {
         socket.current?.disconnect()
      }
   }, [account])

   const emit = (connection, payload) => {
      socket.current?.emit(connection, payload)
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
