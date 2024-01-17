import { Router } from 'express'
import { authenticate } from '../../../middlewares/authenticate.js'
import {
   getGroupsWithLastMessages,
   getMesssages,
   sendMessage,
} from './controller.js'
const route = Router()

route.get('/chatlist', authenticate, getGroupsWithLastMessages)
route.get('/message/:groupId', authenticate, getMesssages)
route.post('/message', authenticate, sendMessage)

export default route
