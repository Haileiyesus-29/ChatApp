import express from 'express'
import {
   getUser,
   updateUser,
   createUser,
   deleteUser,
} from './user.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
const router = express.Router()

router.get('/:id', getUser)
router.post('/', createUser)
router.put('/', authenticate, updateUser)
router.delete('/', authenticate, deleteUser)

export default router
