import express from "express"
import {authenticate} from "@/middlewares/authenticate"
import * as controller from "./groupController"

const router = express.Router()

router.use(authenticate)
/**
 * Route for creating a new group.
 *
 * @remarks
 * This route expects a JSON object in the request body with the following properties:
 * - name: string (required) - The name of the group.
 *
 * @returns The created group object as JSON.
 */
router.post("/", controller.createGroup)
/**
 * Route for retrieving a group by its ID.
 *
 * @remarks
 * This route expects the group ID as a route parameter.
 *
 * @returns The group object as JSON.
 */
router.get("/:id", controller.getGroupById)
/**
 * Route for updating a group.
 *
 * @remarks
 * This route expects the group ID as a route parameter and a JSON object in the request body with the following properties:
 * - name: string (optional) - The updated name of the group.
 *
 * @returns The updated group object as JSON.
 */
router.put("/:id", controller.updateGroup)
/**
 * Route for deleting a group.
 *
 * @remarks
 * This route expects the group ID as a route parameter.
 *
 * @returns A success message as JSON.
 */
router.delete("/:id", controller.deleteGroup)
/**
 * Route for retrieving the members of a group.
 *
 * @remarks
 * This route expects the group ID as a route parameter.
 *
 * @returns The list of group members as JSON.
 */
router.get("/:id/members", controller.getMembers)
/**
 * Route for retrieving the messages of a group.
 *
 * @remarks
 * This route expects the group ID as a route parameter.
 *
 * @returns The list of group messages as JSON.
 */
router.get("/:id/messages", controller.getMessages)
/**
 * Route for sending a message to a group.
 *
 * @remarks
 * This route expects the group ID as a route parameter and a JSON object in the request body with the following properties:
 * - content: string (required) - The content of the message.
 *
 * @returns The created message object as JSON.
 */
router.post("/messages", controller.sendMessage)
/**
 * Route for joining a group.
 *
 * @remarks
 * This route expects the group ID as a route parameter.
 *
 * @returns A success message as JSON.
 */
router.post("/join", controller.joinGroup)
/**
 * Route for leaving a group.
 *
 * @remarks
 * This route expects the group ID as a route parameter.
 *
 * @returns A success message as JSON.
 */
router.post("/leave", controller.leaveGroup)

export default router
