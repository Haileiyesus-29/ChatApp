import {Router} from "express"
import * as userController from "./userController"
import {authenticate} from "@/middlewares/authenticate"

const router = Router()

// Get a specific user by ID
router.get("/:id", authenticate, userController.getUserById)

// Update a user by ID
router.put("/", authenticate, userController.updateUser)

// Update Profile Picture
router.put("/profile", authenticate, userController.updateProfilePicture)

// Get a signed URL for uploading images to Cloudinary
router.get("/signedurl", authenticate, userController.getSignedUrl)

// Delete a user by ID
router.delete("/", authenticate, userController.deleteUser)

export default router
