import {NextFunction, Request, Response} from "express"
import sendResponse from "@/utils/response"
import * as services from "./authService"
import generateToken from "@/helpers/generateToken"
import {ERRORS} from "@/utils/errors"

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const {data, error} = await services.loginUserAccount(req.body)
  if (error) return next(error)

  const token = await generateToken(data?.id!, "access")
  const refToken = await generateToken(data?.id!, "refresh")

  if (!token) return next(ERRORS.serverFailure(["Request failed"]))

  res.cookie("refToken", refToken, {
    httpOnly: true,
    sameSite: "none",
    path: "/api/auth/verify",
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  res.json({...sendResponse(data), token})
}

export async function registerUser(req, res, next) {
  const {data, error} = await services.createNewUser(req.body)
  if (error) return next(error)

  const token = await generateToken(data?.id!, "access")
  const refToken = await generateToken(data?.id!, "refresh")
  if (!token || !refToken) return next(ERRORS.serverFailure(["Request failed"]))

  res.cookie("refToken", refToken, {
    httpOnly: true,
    sameSite: "none",
    path: "/api/auth/verify",
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  res.json({...sendResponse(data, 201), token})
}

export async function verifyUser(req, res: Response, next: NextFunction) {
  const {data, error} = await services.refreshToken(req.cookies)
  if (error) return next(error)

  const token = await generateToken(data?.id!, "access")
  const refToken = await generateToken(data?.id!, "refresh")

  res.cookie("refToken", refToken, {
    httpOnly: true,
    sameSite: "none",
    path: "/api/auth/verify",
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  res.json({...sendResponse(data), token})
}

export async function logoutUser(req: Request, res: Response, next: NextFunction) {
  res.clearCookie("refToken", {
    httpOnly: true,
    sameSite: "none",
    path: "/api/auth/verify",
    secure: true,
  })
  res.sendStatus(204)
}
