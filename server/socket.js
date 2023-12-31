import { io } from './app'

export function onSocketConnection(cb) {
   io.on('connection', socket => {
      console.log('user connected')
      cb(io, socket)
   })
}
