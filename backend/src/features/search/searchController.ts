import {send} from "process"
import * as services from "./searchService"
import sendResponse from "@/utils/response"

export async function searchUser(req, res, next) {
  const query = req.query.q
  const {data, error} = await services.searchUserAccount(query)
  if (error) {
    return next(error)
  }
  res.json(sendResponse(data))
}

export async function searchChannel(req, res, next) {
  const query = req.query.q
  const {data, error} = await services.searchChannel(query)
  if (error) {
    return next(error)
  }
  res.json(sendResponse(data))
}

export async function searchGroup(req, res, next) {
  const query = req.query.q
  const {data, error} = await services.searchGroup(query)
  if (error) {
    return next(error)
  }
  res.json(sendResponse(data))
}

export async function searchAll(req, res, next) {
  const query = req.query.q
  const {data, error} = await services.searchAll(query)
  if (error) {
    return next(error)
  }
  res.json(sendResponse(data))
}
