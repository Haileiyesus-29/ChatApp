import sendResponse from "@/utils/response"
import * as services from "./authService"
import {NextFunction, Request, Response} from "express"

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const {data, error} = await services.loginUserAccount(req.body)
  if (error) return next(error)

  res.json(sendResponse(data))
}

export async function verifyUser(req, res: Response, next: NextFunction) {
  const user = req.user
  res.setHeader(
    "authorization",
    `Bearer ldkjknvkjdshfaiodfhaksjdfhakjfdhskdfoasfnlkdmaiewofakdfnsgadgoewaa`
  )
  res.json(sendResponse(user))
}
