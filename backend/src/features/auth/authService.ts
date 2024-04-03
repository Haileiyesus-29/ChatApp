import bcrypt from "bcryptjs"
import db from "@/config/db"
import {ERRORS} from "@/utils/errors"
import {AccountResponse, ReturnType} from "@/utils/types"
import {User} from "@prisma/client"

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
