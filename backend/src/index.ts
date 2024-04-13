import "module-alias/register"
import "express-async-errors"
import dotenv from "dotenv"
import express, {Express} from "express"
import cors from "cors"
import routes from "@/features/index"
import db from "@/config/db"
import errorHandler from "./middlewares/errorHandler"
import http from "node:http"
import SocketManager from "./features/socket/socket"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
SocketManager.init(server)

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
app.use(express.json())

app.use("/api/user", routes.userRoutes)
app.use("/api/chat", routes.chatRoutes)
app.use("/api/auth", routes.authRoutes)
app.use("/api/channel", routes.channelRoutes)
app.use("/api/group", routes.grouRoutes)
app.use("/api/search", routes.searchRoutes)

app.use(errorHandler)

if (db) {
  server.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`))
} else {
  console.log("database connection failed")
}

// SocketManager.init(server)
// const io = SocketManager.getInstance

// io.on("connection", socket => {
//   console.log(`User connected: ${socket.id}`)
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`)
//   })
// })

export default app
