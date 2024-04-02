import {Request, Response} from "express"

export interface ResponseType<T> {
  data: T | null
  errors: string[] | null
  statusCode?: number
  message?: string
}

export type ErrorType = {
  statusCode: number
  message?: string
  data: null
  errors: any
}

export type ReturnType<T> = {
  data: T | null
  error: ErrorType | null
}

export interface ExtendedRequest extends Request {
  [key: string]: any
}

export interface ExtendedResponse extends Response {
  [key: string]: any
}
