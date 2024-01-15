import express from 'express'
const router = express.Router()

import adminRoutes from './admin/route'
import memberRoutes from './member/route'
router.use(adminRoutes)
router.use(memberRoutes)

export default router
