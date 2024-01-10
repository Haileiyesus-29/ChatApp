import ERRORS from '../../../config/_errors.js'
import { generateToken } from '../../helpers/generateToken.js'
import { validateNewAccount } from '../../validations/validateNewAccount.js'
import {
   deleteUserAccount,
   getUserAccount,
   updateUserAccount,
   createUserAccount,
} from './user.service.js'

export async function getUser(req, res, next) {
   const id = req.params.id
   const user = await getUserAccount(id)
   if (!user) return next(ERRORS.NOT_FOUND)
   res.status(200).json({ account: user })
}

export async function createUser(req, res, next) {
   const error = validateNewAccount(req.body)
   if (error) return next(error)

   const user = await createUserAccount(req.body)
   if (!user) return next(ERRORS.SERVER_FAILED)

   const token = await generateToken({ id: user.id })

   res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
   })
   res.status(200).json({ account: user })
}

export async function updateUser(req, res, next) {
   const updated = await updateUserAccount(req.body, req.user.id)
   if (!updated) return next(ERRORS.SERVER_FAILED)
   res.status(200).json({ account: updated })
}

export async function deleteUser(req, res, next) {
   const password = req.body.password
   if (!password) return next(ERRORS.UNAUTHORISED)

   const deleted = await deleteUserAccount(req.user.id, password)
   if (!deleted) return next(ERRORS.UNAUTHORISED)
   res.sendStatus(204).end()
}
