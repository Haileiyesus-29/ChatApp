import express from 'express'
const router = express.Router()

import adminRoutes from './admin/route.js'
import memberRoutes from './member/route.js'
import messageRoutes from './message/route.js'
import { authenticate } from '../../middlewares/authenticate.js'

router.use(authenticate)
router.use(messageRoutes)
router.use(adminRoutes)
router.use(memberRoutes)

export default router
