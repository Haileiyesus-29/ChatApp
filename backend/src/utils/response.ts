import {ResponseType} from "./types"

function sendResponse<T>(data: T, statusCode = 200): ResponseType<T> {
  return {statusCode, data, errors: null}
}

export default sendResponse
