import {authenticate} from "@/middlewares/authenticate"
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
 * Route for verifying user authentication.
 *
 * @route POST /api/auth/verify
 * @group Authentication
 * @security JWT
 * @returns {void}
 */
router.post("/verify", authenticate, controller.verifyUser)

export default router
