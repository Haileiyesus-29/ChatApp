import express, {Express, Request, Response} from "express"

const app: Express = express()
const port = process.env.PORT || 3000

app.get<{}, {message: string}>("/", (req: Request, res: Response) => {
  res.send({hello: "mssaeg"})
})

export default app
