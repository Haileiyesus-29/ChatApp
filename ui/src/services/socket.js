import { io } from 'socket.io-client'

class SocketClient {
   static #instance = null
   #socket

   constructor() {
      this.#socket = io({
         withCredentials: true,
         reconnectionDelay: 3000,
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
