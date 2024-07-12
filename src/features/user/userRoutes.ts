import {Router} from "express"
import * as userController from "./userController"
import {authenticate} from "../../middlewares/authenticate"

const router = Router()

router.use(authenticate)

// Get a signed URL for uploading images to Cloudinary
router.get("/signedurl", userController.getSignedUrl)

// Get a specific user by ID
router.get("/:id", userController.getUserById)

// Update a user by ID
router.put("/", userController.updateUser)

// Update Profile Picture
router.post("/profile", userController.updateProfilePicture)

// Delete a user by ID
router.delete("/", userController.deleteUser)

export default router
