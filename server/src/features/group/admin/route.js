import { Router } from 'express'
import {
   addAdmin,
   createGroup,
   deleteGroup,
   removeAdmin,
   updateGroup,
} from './controller.js'
import { authenticate } from '../../../middlewares/authenticate.js'
const router = Router()

router.post('/admin', authenticate, addAdmin)
router.post('/admin/remove', authenticate, removeAdmin)

router.post('/', authenticate, createGroup)
router.put('/', authenticate, updateGroup)
router.delete('/:groupId', authenticate, deleteGroup)

export default router
