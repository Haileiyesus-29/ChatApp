import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { getAuth, login, logout } from './auth.controller.js'
const router = express.Router()

router.post('/verify', authenticate, getAuth)
router.post('/login', login)
router.post('/logout', logout)

export default router
