import {ErrorType} from "./types"

export const ERRORS = {
  forbidden: <T extends Object | any[]>(errors: T): ErrorType => ({
    version: "1.0",
    statusCode: 403,
    message: "Forbidden",
    data: null,
    errors,
  }),
  notFound: <T extends Object | any[]>(errors: T) => ({
    version: "1.0",
    statusCode: 404,
    message: "Not Found",
    data: null,
    errors,
  }),
  unauthorized: <T extends Object | any[]>(errors: T) => ({
    version: "1.0",
    statusCode: 401,
    message: "Unauthorized",
    data: null,
    errors,
  }),
  serverFailure: <T extends Object | any[]>(errors: T) => ({
    version: "1.0",
    statusCode: 500,
    message: "Internal Server Error",
    data: null,
    errors,
  }),
  badRequest: <T extends Object | any[]>(errors: T) => ({
    version: "1.0",
    statusCode: 400,
    message: "Bad Request",
    data: null,
    errors,
  }),
}
