import express from 'express'
const router = express.Router()

import adminRoutes from './admin/route.js'
import memberRoutes from './member/route.js'
import messageRoutes from './message/route.js'

router.use(adminRoutes)
router.use(memberRoutes)
router.use(messageRoutes)

export default router
