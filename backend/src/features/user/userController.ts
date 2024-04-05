import sendResponse from "@/utils/response"
import * as services from "./userService"
import generateToken from "@/helpers/generateToken"
import {ERRORS} from "@/utils/errors"

export async function getUserById(req, res, next) {
  const userId = req.params.id
  const {data, error} = await services.findUserById(userId)
  if (error) return next(error)
  res.json(sendResponse(data))
}

export async function updateUser(req, res, next) {
  const {data, error} = await services.updateUserAccount(req.user, req.body)
  if (error) return next(error)
  res.json(sendResponse(data))
}

export async function deleteUser(req, res, next) {
  const {data, error} = await services.deleteUser(req.user, req.body)
  if (error) return next(error)

  res.json(sendResponse(data))
}
