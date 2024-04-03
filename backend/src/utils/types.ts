import {User} from "@prisma/client"
import {Request} from "express"

export interface ResponseType<T> {
  version?: string
  data: T | null
  errors: string[] | null
  statusCode?: number
  message?: string
}

export type ErrorType = {
  version?: string
  statusCode: number
  message?: string
  data: null
  errors: any
}

export type ReturnType<T> = {
  data: T | null
  error: ErrorType | null
}

export type AccountResponse = {
  id: string
  name: string
  image: string | null
  email?: string
  bio?: string | null
  username?: string
  createdAt?: Date
}

export type ExtendedRequest = Request & {user: User}
