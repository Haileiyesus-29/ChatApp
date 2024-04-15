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
  server.listen({port: PORT, host: "192.168.25.202"}, () =>
    console.log(`Server running`, server.address())
  )
} else {
  console.log("database connection failed")
}

export default app
