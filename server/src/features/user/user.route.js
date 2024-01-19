import { Router } from 'express'
import {
   getUser,
   updateUser,
   createUser,
   deleteUser,
} from './user.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
const router = Router()

/**
 * @route   GET /api/user/:id
 * @desc    Get user details by ID
 * @param   id the id of the target user
 * @access  private
 */
router.get('/:id', getUser)

/**
 * @route   POST /api/user
 * @desc    Create a new account
 * @access  public
 * @body   {name, email, password} required
 * @body   {image, bio, username} optional
 */
router.post('/', createUser)

/**
 * @route   PUT /api/user
 * @desc    Update user account
 * @access  private
 * @body   {name, image, bio, username} not all required
 */
router.put('/', authenticate, updateUser)

/**
 * @route   DELETE /api/user
 * @desc    Deletes a user account
 * @access  private
 * @body   {password} required
 */
router.delete('/', authenticate, deleteUser)

export default router
