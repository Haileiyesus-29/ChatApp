import { io } from './app'

export function onSocketConnection(cb) {
   io.on('connection', socket => {
      cb(io, socket)
   })
}
