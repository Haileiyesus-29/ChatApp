import "module-alias/register"
import "express-async-errors"
import dotenv from "dotenv"
import express, {Express, Request, Response} from "express"
import db from "@/config/db"
const app: Express = express()

dotenv.config()
import routes from "@/features/index"

app.use(express.json())
app.use("/api/v1/users", routes.userRoutes)

export default app

const PORT = process.env.PORT || 5000

if (db) {
  app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`))
} else {
  console.log("database connection failed")
}
