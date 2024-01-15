import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/_db.js'
import http from 'http'
import { Server } from 'socket.io'
import compression from 'compression'
import cors from 'cors'

import authRoute from './src/features/auth/auth.route.js'
import userRoute from './src/features/user/user.route.js'
import chatRoute from './src/features/chat/chat.route.js'
import channelRoute from './src/features/channel/channel.route.js'
import groupRoute from './src/features/group/group.route.js'
import { handleErrors } from './src/middlewares/handleErrors.js'

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(
   cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
   })
)

export const io = new Server(server, {
   cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
   },
})

io.on('connection', socket => {
   console.log('user connected')
   io.emit('connection', 'connection successfull')
})

app.get('/bm', (req, res) => res.send('bm'))

app.use('/', (req, res, next) => {
   req.io = io
   next()
})
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/channel', channelRoute)
app.use('/api/group', groupRoute)
app.use('/api/chat', chatRoute)

app.use(handleErrors)

connectDB(() =>
   server.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
   )
)
