import dotenv from "dotenv"
import express, {Express} from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

import routes from "./features/index"
import db from "./config/db"
import errorHandler from "./middlewares/errorHandler"
import http from "node:http"
import SocketManager from "./features/socket/socket"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

const server = http.createServer(app)

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/user", routes.userRoutes)
app.use("/api/chat", routes.chatRoutes)
app.use("/api/auth", routes.authRoutes)
app.use("/api/channel", routes.channelRoutes)
app.use("/api/group", routes.grouRoutes)
app.use("/api/search", routes.searchRoutes)

app.use(express.static(path.join(__dirname, "../client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
})

app.use(errorHandler)

async function main() {
  if (db) {
    await db.$connect()
    console.log("Database connected")
    SocketManager.init(server)
    server.listen(PORT, () => console.log(`Server running on`, server.address()))
  }
}

try {
  main()
} catch (error) {
  console.log("error", error)
}

export default app
