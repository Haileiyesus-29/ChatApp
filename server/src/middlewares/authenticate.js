import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import ERRORS from '../../config/_errors.js'

export const authenticate = async (req, res, next) => {
   const token = req.cookies.jwt
   if (!token) return next(ERRORS.INVALID_TOKEN)

   const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
   const user = await User.findById(verified.id)

   if (!user) return next(ERRORS.NOT_FOUND)
   req.user = user
   next()
}
