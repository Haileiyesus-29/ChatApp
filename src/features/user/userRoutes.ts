import {Router} from "express"
import * as userController from "./userController"
import {authenticate} from "../../middlewares/authenticate"

const router = Router()

// Get a signed URL for uploading images to Cloudinary
router.get("/signedurl", authenticate, userController.getSignedUrl)

// Get a specific user by ID
router.get("/:id", authenticate, userController.getUserById)

// Update a user by ID
router.put("/", userController.updateUser)

// Update Profile Picture
router.post("/profile", userController.updateProfilePicture)

// Delete a user by ID
router.delete("/", authenticate, userController.deleteUser)

export default router
