import {AccountResponse} from "../utils/types"
import {User} from "@prisma/client"

export default function removePassword(user: User): AccountResponse & {password: undefined} {
  return {...user, password: undefined}
}
