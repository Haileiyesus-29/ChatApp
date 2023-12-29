import express from 'express'
import {
   getUser,
   updateUser,
   createUser,
   deleteUser,
} from './user.controller.js'
const router = express.Router()

router.get('/:id', getUser)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router
