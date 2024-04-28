import {Router} from "express"
import * as controller from "./authController"

const router = Router()

/**
 * Route for user login.
 *
 * @route POST /api/auth/login
 * @group Authentication
 * @returns {void}
 */
router.post("/login", controller.loginUser)

/**
 * Route for user registration.
 *
 * @route POST /api/auth/register
 * @group Authentication
 * @returns {void}
 */
router.post("/register", controller.registerUser)

/**
 * Route for verifying user authentication.
 *
 * @route GET /api/auth/verify
 * @group Authentication
 * @security JWT
 * @returns {void}
 */
router.get("/verify", controller.verifyUser)

export default router
