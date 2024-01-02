import ERRORS from '../../../config/_errors.js'
import { generateToken } from '../../helpers/generateToken.js'
import { verifyUserAccount } from './auth.service.js'

export function getAuth(req, res) {
   return res.status(200).json({ account: req.user })
}

export async function login(req, res, next) {
   const { email, password } = req.body
   if (!email || !password) return next(ERRORS.INVALID_CREDIENTIAL)
   const user = await verifyUserAccount(email, password)
   if (!user) return next(ERRORS.BAD_REQUEST)

   const token = await generateToken({ id: user.id })
   res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
   res.status(200).json({ account: user })
}

export function logout(req, res) {
   res.cookie('jwt', '', { httpOnly: true, maxAge: 0 })
   res.sendStatus(204).end()
}
