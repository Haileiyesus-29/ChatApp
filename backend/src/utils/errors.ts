import {ErrorType} from "./types"

export const ERRORS = {
  forbidden: <T extends Object | any[]>(errors: T): ErrorType => ({
    statusCode: 403,
    message: "Forbidden",
    data: null,
    errors,
  }),
  notFound: <T extends Object | any[]>(errors: T) => ({
    statusCode: 404,
    message: "Not Found",
    data: null,
    errors,
  }),
  unauthorized: <T extends Object | any[]>(errors: T) => ({
    statusCode: 401,
    message: "Unauthorized",
    data: null,
    errors,
  }),
  serverFailure: <T extends Object | any[]>(errors: T) => ({
    statusCode: 500,
    message: "Internal Server Error",
    data: null,
    errors,
  }),
  badRequest: <T extends Object | any[]>(errors: T) => ({
    statusCode: 400,
    message: "Bad Request",
    data: null,
    errors,
  }),
}
