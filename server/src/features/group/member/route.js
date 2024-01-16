import { Router } from 'express'
import { authenticate } from '../../../middlewares/authenticate.js'
import {
   getAdmins,
   getGroup,
   getMembers,
   joinGroup,
   leaveGroup,
   myGroups,
} from './controller.js'

const router = Router()

router.get('/', authenticate, myGroups)
router.get('/:groupId', authenticate, getGroup)

router.get('/members/:groupId', authenticate, getMembers)
router.get('/admins/:groupId', authenticate, getAdmins)

router.post('/join', authenticate, joinGroup)
router.post('/leave', authenticate, leaveGroup)

export default router
