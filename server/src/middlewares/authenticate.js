import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import ERRORS from '../../config/_errors.js'

/**
 * @middleware   authenticate
 * @desc         Middleware to authenticate user using JWT token
 * @param        {Object} req - Express request object
 * @param        {Object} res - Express response object
 * @param        {Function} next - Express next middleware function
 * @returns      {void}
 * @throws       {Object} ERRORS.INVALID_TOKEN - Invalid or missing JWT token
 *               {Object} ERRORS.NOT_FOUND - User not found in the database
 */
export const authenticate = async (req, res, next) => {
   const token = req.cookies.jwt
   if (!token) return next(ERRORS.INVALID_TOKEN)

   const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
   const user = await User.findById(verified.id).select('-password')
   if (!user) return next(ERRORS.NOT_FOUND)
   req.user = user
   return next()
}
