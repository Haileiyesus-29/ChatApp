import {Router} from "express"
import {authenticate} from "@/middlewares/authenticate"
import * as controller from "./chatController"

/**
 * Express router for chat routes.
 * @module chatRoutes
 */

const route = Router()

/**
 * Route for sending a message.
 * @name POST /
 * @function
 * @memberof module:chatRoutes
 * @param {Object} req.body - The request body containing the message data.
 * @param {string} req.body.message - The message content.
 * @param {string} req.body.recipientId - The ID of the message recipient.
 */
route.post("/", authenticate, controller.sendMessage)

/**
 * Route for getting the contacts list.
 * @name GET /contacts
 * @function
 * @memberof module:chatRoutes
 */
route.get("/contacts", authenticate, controller.getContacts)

/**
 * Route for adding user to contacts list.
 * @name POST /contacts
 * @function
 * @memberof module:chatRoutes
 * @param {string} req.body.contactId
 */
route.post("/contacts", authenticate, controller.addToContact)

/**
 * Route for getting the list of chatted contacts.
 * @name GET /chatted
 * @function
 * @memberof module:chatRoutes
 */
route.get("/chatted", authenticate, controller.getChattedList)

/**
 * Route for getting the message thread with a specific contact.
 * @name GET /:contactId
 * @function
 * @memberof module:chatRoutes
 * @param {string} req.params.contactId - The ID of the contact to retrieve the message thread for.
 */
route.get("/:contactId", authenticate, controller.getMessageThread)

export default route
