import ERRORS from '../../../config/_errors.js'
import RESPONSE from '../../../config/_response.js'
import { generateToken } from '../../helpers/generateToken.js'
import { verifyUserAccount } from './auth.service.js'

export function getAuth(req, res) {
   return res.status(200).json(RESPONSE.success(req.user, 200))
}

export async function login(req, res, next) {
   const { email, password } = req.body
   if (!email || !password)
      return next(RESPONSE.error(ERRORS.WRONG_EMAIL_OR_PASSWORD))
   const user = await verifyUserAccount(email, password)
   if (!user) return next(RESPONSE.error(ERRORS.BAD_REQUEST))

   const token = await generateToken({ id: user.id })
   res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
   })
   res.status(200).json(RESPONSE.success(user))
}

export function logout(req, res) {
   res.cookie('jwt', '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: 'None',
   })
   res.sendStatus(204).end()
}
