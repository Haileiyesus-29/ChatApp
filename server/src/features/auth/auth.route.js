import express from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { getAuth, login, logout } from './auth.controller.js'
const router = express.Router()

/**
 * @route   GET /api/auth/verify
 * @desc    verifies wheather an account has authentication token
 * @access  public
 */
router.post('/verify', authenticate, getAuth)

/**
 * @route   GET /api/auth/login
 * @desc    authenticate user to log into the system
 * @body    {email,password}
 * @access  public
 */
router.post('/login', login)

/**
 * @route   GET /api/auth/logout
 * @desc    remove user authentication token on the user device to logout of the system
 * @body    {email,password}
 * @access  public
 */
router.post('/logout', logout)

export default router
