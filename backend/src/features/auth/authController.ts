import sendResponse from "@/utils/response"
import * as services from "./authService"
import {NextFunction, Request, Response} from "express"
import generateToken from "@/helpers/generateToken"
import {ERRORS} from "@/utils/errors"

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const {data, error} = await services.loginUserAccount(req.body)
  if (error) return next(error)

  if (!data?.id) return next(ERRORS.serverFailure(["Request failed"]))

  const token = await generateToken(data.id)
  if (!token) return next(ERRORS.serverFailure(["Request failed"]))

  res.setHeader("Authorization", `Bearer ${token}`)
  res.setHeader("Access-Control-Expose-Headers", "Authorization")
  res.json(sendResponse(data))
}

export async function regusterUser(req, res, next) {
  const {data, error} = await services.createNewUser(req.body)
  if (error) return next(error)
  if (!data?.id) return next(ERRORS.serverFailure(["Request failed"]))

  const token = await generateToken(data.id)
  if (!token) return next(ERRORS.serverFailure(["Request failed"]))

  res.setHeader("Authorization", `Bearer ${token}`)
  res.setHeader("Access-Control-Expose-Headers", "Authorization")

  res.json(sendResponse(data, 201))
}

export async function verifyUser(req, res: Response, next: NextFunction) {
  res.json(sendResponse(req.user))
}
