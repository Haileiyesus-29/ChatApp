import {NextFunction, Response} from "express"
import * as services from "./groupService"
import sendResponse from "@/utils/response"
import SocketManager from "../socket/socket"

export async function getMessages(req, res: Response, next: NextFunction) {
  const {data, error} = await services.getMessages(req.user, req.params.id)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}

export async function getGroups(req, res: Response, next: NextFunction) {
  const {data, error} = await services.getGroups(req.user)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}
export async function createGroup(req, res: Response, next: NextFunction) {
  const {data, error} = await services.createGroup(req.user, req.body)
  if (error) return next(error)
  res.json(sendResponse(data, 201))
}

export async function getGroupById(req, res: Response, next: NextFunction) {
  const {data, error} = await services.getGroupById(req.params.id)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}

export async function updateGroup(req, res: Response, next: NextFunction) {
  const {data, error} = await services.updateGroup(req.user, req.body)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}

export async function deleteGroup(req, res: Response, next: NextFunction) {
  const {error} = await services.deleteGroupWithId(req.user, req.params.id)
  if (error) return next(error)
  res.sendStatus(204)
}

export async function joinGroup(req, res: Response, next: NextFunction) {
  const {data, error} = await services.joinGroup(req.user, req.body)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}

export async function leaveGroup(req, res: Response, next: NextFunction) {
  const {data, error} = await services.leaveGroup(req.user, req.body)
  if (error) return next(error)
  res.sendStatus(204)
}

export async function sendMessage(req, res: Response, next: NextFunction) {
  const {data, error} = await services.sendMessage(req.user, req.body)
  if (error) return next(error)

  SocketManager.instance.sendToGroup(req.body.recipientId, data)
  res.json(sendResponse(data, 201))
}

export async function getMembers(req, res: Response, next: NextFunction) {
  const {data, error} = await services.getMembers(req.user, req.params.id)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}
