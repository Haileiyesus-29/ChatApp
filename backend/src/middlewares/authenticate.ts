import db from "@/config/db"
import {ERRORS} from "@/utils/errors"
import {NextFunction, Request, Response} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ").at(1)!

  const secretKey = process.env.JWT_SECRET_KEY
  if (!secretKey) {
    return next(ERRORS.unauthorized(["Invalid token"]))
  }

  const verified = jwt.verify(token, secretKey) as JwtPayload

  const user = await db.user.findFirst({
    where: {
      id: verified.id,
    },
  })
  if (!user) return next(ERRORS.unauthorized(["Invalid token"]))
  Object.assign(req, user)

  next()
}
