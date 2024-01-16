import express from 'express'
const router = express.Router()

import adminRoutes from './admin/route.js'
import memberRoutes from './member/route.js'
router.use(adminRoutes)
router.use(memberRoutes)

export default router
