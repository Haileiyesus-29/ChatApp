import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const ENDPOINT = import.meta.env.VITE_SERVER_ADDR // Replace with Socket.IO server URL
const socket = io(ENDPOINT)

function useSocket(connection) {
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)

   useEffect(() => {
      if (socket && connection) {
         socket.on(connection, received => setData(received))
      } else {
         setError('connection failed')
      }
      return () => {
         setError(null)
      }
   }, [connection])

   const emit = payload => {
      if (socket) socket.emit(connection, payload)
   }

   return { data, emit }
}

export default useSocket
