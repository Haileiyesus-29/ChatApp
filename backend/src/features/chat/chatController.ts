import {NextFunction, Response} from "express"
import * as service from "./chatService"
import sendResponse from "@/utils/response"
import SocketManager from "@/features/socket/socket"

export async function getContacts(req, res: Response, next: NextFunction) {
  const {data, error} = await service.getContactList(req.user)
  if (error) return next(error)

  res.json(sendResponse(data))
}

export async function addToContact(req, res: Response, next: NextFunction) {
  const {data, error} = await service.addContact(req.user, req.body)
  if (error) return next(error)

  res.json(sendResponse(data, 201))
}

export async function sendMessage(req, res: Response, next: NextFunction) {
  const {data, error} = await service.sendMessage(req.user, req.body)
  if (error) return next(error)

  SocketManager.instance.sendToUser(req.user.id, req.body.recipientId, data)
  res.json(sendResponse(data, 201))
}

export async function getMessageThread(req, res: Response, next: NextFunction) {
  const {data, error} = await service.getChatMessageThread(req.user, req.params.contactId)
  if (error) return next(error)

  res.json(sendResponse(data))
}

export async function getChattedList(req, res: Response, next: NextFunction) {
  const {data, error} = await service.getChattedAccounts(req.user)
  if (error) return next(error)

  res.json(sendResponse(data))
}
