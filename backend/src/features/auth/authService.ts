import bcrypt from "bcryptjs"
import jwt, {JwtPayload} from "jsonwebtoken"
import db from "@/config/db"
import {ERRORS} from "@/utils/errors"
import {AccountResponse, ReturnType} from "@/utils/types"
import {User} from "@prisma/client"
import findByUsername from "@/helpers/findByUsername"
import hashPassword from "@/helpers/hashPassword"
import removePassword from "@/helpers/removePassword"

export async function loginUserAccount(payload: {
  email: string
  password: string
}): Promise<ReturnType<AccountResponse>> {
  if (!payload.email || !payload.password)
    return {data: null, error: ERRORS.badRequest(["Invalid credentials"])}

  const user = await db.user.findFirst({
    where: {email: payload.email},
  })

  if (!user || !(await bcrypt.compare(payload.password, user.password)))
    return {data: null, error: ERRORS.badRequest(["Invalid email or password"])}

  const withoutPassword = {...user, password: undefined}

  return {data: withoutPassword, error: null}
}

/**
 * Creates a new user in the database.
 * @param payload - The user data to be created.
 * @returns A Promise that resolves to the created user or an error object.
 */
export async function createNewUser(payload: User): Promise<ReturnType<AccountResponse>> {
  if (!payload.name || !payload.email || !payload.password)
    return {data: null, error: ERRORS.badRequest(["Invalid credentials"])}

  const currentUser = await db.user.findFirst({
    where: {
      email: payload.email,
    },
  })

  if (currentUser) return {data: null, error: ERRORS.badRequest(["Email already registered"])}

  if (payload.username && (await findByUsername(payload.username)))
    return {data: null, error: ERRORS.badRequest(["Username not available"])}

  const hashedPassword = await hashPassword(payload.password)

  const user = await db.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      username:
        payload.username || `user_${parseInt((Math.random() * 1e13).toString()) + Date.now()}`,
      bio: payload.bio,
      image: payload.image,
    },
  })

  return {data: removePassword(user), error: null}
}

/**
 * Refreshes the user token.
 * @param payload - The user data to be refreshed.
 * @returns A Promise that resolves to the refreshed user or an error object.
 */
export async function refreshToken(payload: {
  refToken: string
}): Promise<ReturnType<AccountResponse>> {
  if (!payload.refToken) return {data: null, error: ERRORS.badRequest(["Invalid token"])}

  let verified: JwtPayload

  try {
    verified = jwt.verify(payload.refToken, process.env.JWT_REFRESH_KEY!) as JwtPayload
  } catch (error) {
    return {data: null, error: ERRORS.badRequest(["Invalid token"])}
  }

  const user = await db.user.findFirst({
    where: {
      id: verified.id,
    },
  })

  if (!user) return {data: null, error: ERRORS.badRequest(["Invalid token"])}

  return {data: {...removePassword(user)}, error: null}
}
