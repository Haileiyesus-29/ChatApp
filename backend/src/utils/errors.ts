interface ErrorFormat {
  status?: number
  data?: null
  message?: string
  errors: string[]
}

const ERRORS = {
  FORBIDDEN: {data: null, status: 403, message: "Forbidden"},
  NOT_FOUND: {data: null, status: 404, message: "Not Found"},
  UNAUTHORIZED: {data: null, status: 401, message: "Unauthorized"},
  SERVER_FAILURE: {data: null, status: 500, message: "Internal Server Error"},
  BAD_REQUEST: {data: null, status: 400, message: "Bad Request"},
}

const sendError: (errorType: keyof typeof ERRORS, errors: string[]) => ErrorFormat = (
  errorType,
  errors
) => {
  return {
    ...ERRORS[errorType],
    errors,
  }
}
export default sendError
