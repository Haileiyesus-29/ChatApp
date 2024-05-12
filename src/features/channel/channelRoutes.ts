import express from "express"
const router = express.Router()
import {authenticate} from "../../middlewares/authenticate"
import * as controller from "./channelController"

router.use(authenticate)

router.get("/", controller.getChannels)
/**
 * Route for creating a new channel.
 *
 * @remarks
 * This route expects a JSON object in the request body with the following properties:
 * - name: string (required) - The name of the channel.
 *
 * @returns The created channel object as JSON.
 */
router.post("/", controller.createChannel)
/**
 * Route for retrieving a channel by its ID.
 *
 * @remarks
 * This route expects the channel ID as a route parameter.
 *
 * @returns The channel object as JSON.
 */
router.get("/:id", controller.getChannelById)
/**
 * Route for updating a channel.
 *
 * @remarks
 * This route expects the channel ID as a route parameter and a JSON object in the request body with the following properties:
 * - name: string (optional) - The updated name of the channel.
 *
 * @returns The updated channel object as JSON.
 */
router.put("/:id", controller.updateChannel)
/**
 * Route for deleting a channel.
 *
 * @remarks
 * This route expects the channel ID as a route parameter.
 *
 * @returns A success message as JSON.
 */
router.delete("/:id", controller.deleteChannel)
/**
 * Route for retrieving the members of a channel.
 *
 * @remarks
 * This route expects the channel ID as a route parameter.
 *
 * @returns The list of channel members as JSON.
 */
router.get("/:id/members", controller.getMembers)
/**
 * Route for retrieving the messages of a channel.
 *
 * @remarks
 * This route expects the channel ID as a route parameter.
 *
 * @returns The list of channel messages as JSON.
 */
router.get("/:id/messages", controller.getMessages)
/**
 * Route for sending a message to a channel.
 *
 * @remarks
 * This route expects the channel ID as a route parameter and a JSON object in the request body with the following properties:
 * - content: string (required) - The content of the message.
 *
 * @returns The created message object as JSON.
 */
router.post("/messages", controller.sendMessage)
/**
 * Route for joining a channel.
 *
 * @remarks
 * This route expects the channel ID as a route parameter.
 *
 * @returns A success message as JSON.
 */
router.post("/join", controller.joinChannel)
/**
 * Route for leaving a channel.
 *
 * @remarks
 * This route expects the channel ID as a route parameter.
 *
 * @returns A success message as JSON.
 */
router.post("/leave", controller.leaveChannel)
export default router
