import sendResponse from "@/utils/response"
import * as services from "./userService"
import genUploadSignature from "@/helpers/genUploadSingature"

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

export async function updateProfilePicture(req, res, next) {
  const {data, error} = await services.updateProfilePicture(req.body)
  if (error) return next(error)

  res.json(sendResponse(data))
}

export async function deleteUser(req, res, next) {
  const {data, error} = await services.deleteUser(req.user, req.body)
  if (error) return next(error)

  res.json(sendResponse(data))
}

export async function getSignedUrl(req, res) {
  const data = genUploadSignature({id: req.user.id})

  res.json(sendResponse(data))
}
