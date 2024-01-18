import express from 'express'
const router = express.Router()

import adminRoutes from './admin/route.js'
import memberRoutes from './member/route.js'
import postRoutes from './post/route.js'
import { authenticate } from '../../middlewares/authenticate.js'

router.use(authenticate)
router.use(memberRoutes)
router.use(adminRoutes)
router.use(postRoutes)

export default router
