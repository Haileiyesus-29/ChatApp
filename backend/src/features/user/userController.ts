import sendResponse from "@/utils/response"
import * as services from "./userService"

export async function getUserById(req, res, next) {
  const userId = req.params.id
  const {data, error} = await services.findUserById(userId)
  if (error) return next(error)
  res.send(sendResponse(data))
}

export async function createUser(req, res, next) {
  const {data, error} = await services.createNewUser(req.body)
  if (error) return next(error)
  res.send(sendResponse(data))
}

export async function updateUser(req, res, next) {
  const {data, error} = await services.updateUserAccount(req.body, req.user)
  if (error) return next(error)
  res.send(sendResponse(data))
}

export async function deleteUser(req, res, next) {
  const {data, error} = await services.deleteUser(req.user)
  if (error) return next(error)

  res.json(sendResponse(data))
}
