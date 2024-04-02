import {User} from "@prisma/client"
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

export type AccountResponse = {
  id: string
  name: string
  image: string | null
  email?: string
  bio?: string | null
  username?: string
  createdAt?: string
}

export type ExtendedRequest = Request & {user: User}
