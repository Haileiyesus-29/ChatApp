import db from "@/config/db"
import {ERRORS} from "@/utils/errors"
import {ReturnType} from "@/utils/types"
import {User} from "@prisma/client"

export async function loginUserAccount(payload: {
  email: string
  password: string
}): Promise<ReturnType<User>> {
  const user = await db.user.findFirst({
    where: {email: payload.email},
  })

  if (!user) return {data: null, error: ERRORS.badRequest(["Invalid email or password"])}
  if (payload.password !== user.password) {
    return {data: null, error: ERRORS.badRequest(["Invalid email or password"])}
  }

  return {data: user, error: null}
}
