import {Router} from "express"
import * as userController from "./userController"

const router = Router()

// Create a new user
router.post("/", userController.createUser)

// Get a specific user by ID
router.get("/:id", userController.getUserById)

// Update a user by ID
router.put("/:id", userController.updateUser)

// Delete a user by ID
router.delete("/:id", userController.deleteUser)

export default router
