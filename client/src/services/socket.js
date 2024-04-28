import { io } from 'socket.io-client'

class SocketClient {
   static #instance = null
   #socket

   constructor() {
      this.#socket = io(import.meta.env.VITE_API_URL, {
         withCredentials: true,
         reconnectionDelay: 1000,
         autoConnect: false,
         auth: {
            token: sessionStorage.getItem('token'),
         },
      })

      this.#socket.on('connect', () => {
         console.log('Connected to server')
      })

      this.#socket.on('disconnect', () => {
         console.log('Disconnected from server')
      })
   }

   get socket() {
      return this.#socket
   }

   static get instance() {
      if (!this.#instance) {
         this.#instance = new SocketClient()
      }
      return this.#instance
   }
}

const instance = SocketClient.instance

export default instance
