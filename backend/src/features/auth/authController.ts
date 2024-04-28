import {NextFunction, Request, Response} from "express"
import jwt, {Jwt, JwtPayload} from "jsonwebtoken"
import sendResponse from "@/utils/response"
import * as services from "./authService"
import generateToken from "@/helpers/generateToken"
import {ERRORS} from "@/utils/errors"

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const {data, error} = await services.loginUserAccount(req.body)
  if (error) return next(error)

  if (!data?.id) return next(ERRORS.serverFailure(["Request failed"]))

  const token = await generateToken(data.id)
  const refToken = await generateToken(data.id)
  if (!token) return next(ERRORS.serverFailure(["Request failed"]))

  res.cookie("refToken", refToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/api/auth/verify",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  res.json(sendResponse({...data, token}))
}

export async function registerUser(req, res, next) {
  const {data, error} = await services.createNewUser(req.body)
  if (error) return next(error)
  if (!data?.id) return next(ERRORS.serverFailure(["Request failed"]))

  const token = await generateToken(data.id)
  const refToken = await generateToken(data.id)
  if (!token || !refToken) return next(ERRORS.serverFailure(["Request failed"]))

  res.cookie("refToken", refToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/api/auth/verify",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  res.json(sendResponse({...data, token}, 201))
}

export async function verifyUser(req, res: Response, next: NextFunction) {
  const {data, error} = await services.refreshToken(req.cookies)
  if (error) return next(error)

  const token = jwt.sign({id: data?.id}, process.env.JWT_SECRET_KEY!, {
    expiresIn: "15m",
  })

  const refToken = jwt.sign({id: data?.id}, process.env.JWT_REFRESH_KEY!, {
    expiresIn: "7d",
  })

  res.cookie("refToken", refToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/api/auth/verify",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  res.json(sendResponse({...data, token}))
}
