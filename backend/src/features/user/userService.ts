import {User} from "@prisma/client"
import db from "@/config/db"

interface UserInput {
  name: string
  email: string
  password: string
  bio?: string
  username?: string
}

export async function createNewUser(payload: UserInput): Promise<User | null> {
  try {
    const user = await db.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        username: payload.username || `user_${parseInt((Math.random() * 1e10).toString())}`,
        bio: payload.bio,
      },
    })
    return user
  } catch (error) {
    console.error(error)
  }

  return null
}
