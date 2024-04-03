import {User} from "@prisma/client"
import db from "@/config/db"
import {ERRORS} from "@/utils/errors"
import {NextFunction, Request, Response} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"

export async function authenticate(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ").at(1)!

  if (!token) {
    return next(ERRORS.badRequest(["Invalid token"]))
  }

  const secretKey = process.env.JWT_SECRET_KEY
  if (!secretKey) {
    return next(ERRORS.badRequest(["Invalid token"]))
  }

  let verified: JwtPayload
  try {
    verified = jwt.verify(token, secretKey) as JwtPayload
  } catch (error) {
    return next(ERRORS.badRequest(["Invalid token"]))
  }

  const user = await db.user.findFirst({
    where: {
      id: verified.id,
    },
  })

  if (!user) return next(ERRORS.badRequest(["Invalid token"]))

  req.user = user

  next()
}
