import "module-alias/register"
import "express-async-errors"
import dotenv from "dotenv"
import express, {Express} from "express"
import cors from "cors"
import routes from "@/features/index"
import db from "@/config/db"
import errorHandler from "./middlewares/errorHandler"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

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

app.use(errorHandler)

if (db) {
  app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`))
} else {
  console.log("database connection failed")
}
export default app
