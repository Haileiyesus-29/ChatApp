import {ResponseType} from "./types"

function sendResponse<T>(data: T, statusCode = 200): ResponseType<T> {
  return {version: "1.0", statusCode, data, errors: null}
}

export default sendResponse
