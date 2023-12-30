import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import {
   addAdmin,
   createGroup,
   deleteGroup,
   getAdmins,
   getGroup,
   getMembers,
   joinGroup,
   leaveGroup,
   removeAdmin,
   updateGroup,
} from './group.controller.js'

const router = express.Router()

router.get('/:groupId', authenticate, getGroup)

router.get('/members/:groupId', authenticate, getMembers)
router.get('/admins/:groupId', authenticate, getAdmins)

router.post('/join', authenticate, joinGroup)
router.post('/leave', authenticate, leaveGroup)

router.post('/admin', authenticate, addAdmin)
router.post('/admin/remove', authenticate, removeAdmin)

router.post('/', authenticate, createGroup)
router.put('/:groupId', authenticate, updateGroup)
router.delete('/:groupId', authenticate, deleteGroup)

export default router
