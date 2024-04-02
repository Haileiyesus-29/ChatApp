import {NextFunction, Request, Response} from "express"
import * as services from "./channelService"
import sendResponse from "@/utils/response"

export async function getMessages(req, res: Response, next: NextFunction) {
  const {data, error} = await services.getMessages(req.user, req.params.id)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}

export async function sendMessage(req, res: Response, next: NextFunction) {
  const {data, error} = await services.sendMessage(req.user, req.params.id, req.body)
  if (error) return next(error)
  res.json(sendResponse(data, 201))
}

export async function getMembers(req, res: Response, next: NextFunction) {
  const {data, error} = await services.getMembers(req.user, req.params.id)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}

export async function updateChannel(req, res: Response, next: NextFunction) {
  const {data, error} = await services.updateChannelWithId(req.user, req.params.id, req.body)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}

export async function deleteChannel(req, res: Response, next: NextFunction) {
  const {data, error} = await services.deleteChannelWithId(req.user, req.params.id)
  if (error) return next(error)
  res.sendStatus(204)
}

export async function createChannel(req, res: Response, next: NextFunction) {
  const {data, error} = await services.createChannel(req.user, req.body)
  if (error) return next(error)
  res.json(sendResponse(data, 201))
}

export async function getChannelById(req, res: Response, next: NextFunction) {
  const {data, error} = await services.getChannelById(req.params.id)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}
export async function joinChannel(req, res: Response, next: NextFunction) {
  const {data, error} = await services.joinChannel(req.user, req.params.id)
  if (error) return next(error)
  res.json(sendResponse(data, 200))
}
export async function leaveChannel(req, res: Response, next: NextFunction) {
  const {data, error} = await services.leaveChannel(req.user, req.params.id)
  if (error) return next(error)
  res.sendStatus(204)
}
