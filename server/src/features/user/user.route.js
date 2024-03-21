import { Router } from 'express'
import {
   getUser,
   updateUser,
   createUser,
   deleteUser,
   findUser,
} from './user.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
import uploader from '../../middlewares/uploader.js'
const router = Router()

/**
 * @route   GET /api/user/:id
 * @desc    Get user details by ID
 * @param   {id} the id of the target user
 * @access  private
 */
router.get('/:id', authenticate, getUser)

/**
 * @route   GET /api/user/:username
 * @desc    Get user details by username
 * @param   {username} the username of the target user
 * @access  private
 */
router.get('/find/:username', authenticate, findUser)

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
router.put('/', authenticate, uploader('image'), updateUser)

/**
 * @route   DELETE /api/user
 * @desc    Deletes a user account
 * @access  private
 * @body   {password} required
 */
router.delete('/', authenticate, deleteUser)

export default router
