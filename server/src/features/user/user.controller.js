import RESPONSE from '../../../config/_response.js'
import { generateToken } from '../../helpers/generateToken.js'
import { validateNewAccount } from '../../validations/validateNewAccount.js'
import {
   deleteUserAccount,
   getUserAccount,
   updateUserAccount,
   createUserAccount,
   findUserByUsername,
} from './user.service.js'

export async function getUser(req, res, next) {
   const { error, user } = await getUserAccount(req.params.id)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(user, 200))
}

export async function findUser(req, res, next) {
   const { error, user } = await findUserByUsername(req.params.username)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(user, 200))
}

export async function createUser(req, res, next) {
   const { error, user } = await createUserAccount(req.body)
   if (error) return next(RESPONSE.error(error))

   const token = await generateToken({ id: user.id })

   res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
   })

   res.status(201).json(RESPONSE.success(user, 201))
}

export async function updateUser(req, res, next) {
   const { error, updated } = await updateUserAccount(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.status(200).json(RESPONSE.success(updated, 200))
}

export async function deleteUser(req, res, next) {
   const { error } = await deleteUserAccount(req.user, req.body)
   if (error) return next(RESPONSE.error(error))

   res.cookie('jwt', '', {
      httpOnly: true,
      maxAge: 0,
      secure: true,
      sameSite: 'None',
   })
   res.sendStatus(204).end()
}
