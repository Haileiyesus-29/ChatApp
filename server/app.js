import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/_db.js'
import http from 'http'
import { Server } from 'socket.io'

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

app.get('/', (req, res) => res.send('hello bm'))

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/channel', channelRoute)
app.use('/api/group', groupRoute)
app.use('/api/chat', chatRoute)

app.use(handleErrors)

export const io = new Server(server, {
   connectionStateRecovery: true,
})

connectDB(() =>
   server.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
   )
)
