import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/_db.js'
import http from 'http'
import { Server } from 'socket.io'
import compression from 'compression'
import cors from 'cors'
import 'express-async-errors'

import authRoute from './src/features/auth/auth.route.js'
import userRoute from './src/features/user/user.route.js'
import chatRoute from './src/features/chat/chat.route.js'
import channelRoute from './src/features/channel/channel.route.js'
import groupRoute from './src/features/group/group.route.js'
import { handleErrors } from './src/middlewares/handleErrors.js'
import { logger } from './config/_logger.js'

dotenv.config()

const app = express()
const server = http.createServer(app)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(cookieParser())
app.use(compression())

app.use(
   cors({
      origin: [process.env.CLIENT_ADDR],
      credentials: true,
   })
)

export const io = new Server(server, {
   cors: {
      origin: [process.env.CLIENT_ADDR],
      credentials: true,
   },
})

io.on('connection', socket => {
   process.env.NODE_ENV === 'dev' &&
      logger.info(`new socket connection ${socket.id}`)
})
io.on('disconnect', socket => {
   process.env.NODE_ENV === 'dev' &&
      logger.info(`closed socket connection ${socket.id}`)
})

app.use((req, _, next) => {
   process.env.NODE_ENV === 'dev' && logger.info(` ${req.method} ${req.url}`)
   next()
})

app.use('/', (req, _, next) => {
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
export default app
