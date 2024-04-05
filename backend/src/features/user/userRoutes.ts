import {Router} from "express"
import * as userController from "./userController"
import {authenticate} from "@/middlewares/authenticate"

const router = Router()

// Get a specific user by ID
router.get("/:id", authenticate, userController.getUserById)

// Update a user by ID
router.put("/", authenticate, userController.updateUser)

// Delete a user by ID
router.delete("/", authenticate, userController.deleteUser)

export default router
