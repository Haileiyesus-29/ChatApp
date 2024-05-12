import {authenticate} from "../../middlewares/authenticate"
import * as controller from "./searchController"
import {Router} from "express"

const router = Router()

router.get("/", authenticate, controller.searchAll)
router.get("/user", authenticate, controller.searchUser)
router.get("/channel", authenticate, controller.searchChannel)
router.get("/group", authenticate, controller.searchGroup)

export default router
