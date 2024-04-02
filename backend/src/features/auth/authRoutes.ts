import {authenticate} from "@/middlewares/authenticate"
import {Router} from "express"
import * as controller from "./authController"

const router = Router()

router.post("/login", controller.loginUser)
router.post("/verify", authenticate)
