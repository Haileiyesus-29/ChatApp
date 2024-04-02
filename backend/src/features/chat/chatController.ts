import {NextFunction, Response} from "express"
import * as service from "./chatService"

export async function getContacts(req, res: Response, next: NextFunction) {
  const {data, error} = await service.getContactList(req.user)
  if (error) return next(error)

  res.json(data)
}

export async function sendMessage(req, res: Response, next: NextFunction) {
  const {data, error} = await service.sendMessage(req.user, req.params.contactId, req.body.message)
  if (error) return next(error)

  res.json(data)
}

export async function getMessageThread(req, res: Response, next: NextFunction) {
  const {data, error} = await service.getChatMessageThread(req.user, req.params.contactId)
  if (error) return next(error)

  res.json(data)
}

export async function getChattedList(req, res: Response, next: NextFunction) {
  const {data, error} = await service.getChattedAccounts(req.user)
  if (error) return next(error)

  res.json(data)
}
