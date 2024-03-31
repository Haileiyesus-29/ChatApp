interface ResponseFormat<T> {
  status: number
  message: string
  errors: null
  data: T
}
const sendResponse = <T>(data: T, status: number = 200): ResponseFormat<T> => {
  return {
    status,
    message: "OK",
    data,
    errors: null,
  }
}

export default sendResponse
