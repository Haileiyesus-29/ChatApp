import {User} from "@prisma/client"
import db from "@/config/db"
import findByUsername from "@/helpers/findByUsername"
import {ReturnType} from "@/utils/types"
import {ERRORS} from "@/utils/errors"

interface UserInput {
  name?: string
  password?: string
  bio?: string
  username?: string
  image?: string
}

/**
 * Creates a new user in the database.
 * @param payload - The user data to be created.
 * @returns A Promise that resolves to the created user or an error object.
 */
export async function createNewUser(payload: User): Promise<ReturnType<User>> {
  if (!payload.name || !payload.email || !payload.password)
    return {data: null, error: ERRORS.badRequest(["Invalid credentials provided"])}

  const currentUser = await db.user.findFirst({
    where: {
      email: payload.email,
    },
  })

  if (currentUser) return {data: null, error: ERRORS.badRequest(["Email already in use"])}

  if (payload.username && (await findByUsername(payload.username)))
    return {data: null, error: ERRORS.badRequest(["Username not available"])}

  const user = await db.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      username:
        payload.username || `user_${parseInt((Math.random() * 1e13).toString()) + Date.now()}`,
      bio: payload.bio,
      image: payload.image,
    },
  })

  return {data: user, error: null}
}

/**
 * Finds a user by their ID.
 * @param id - The ID of the user to find.
 * @returns A Promise that resolves to the found user or an error object.
 */
export async function findUserById(id: string): Promise<ReturnType<User>> {
  const user = await db.user.findFirst({
    where: {
      id,
    },
  })
  if (!user) return {data: null, error: ERRORS.notFound(["User not found"])}

  return {data: user, error: null}
}

/**
 * Updates a user's account information.
 * @param payload - The updated user data.
 * @param userData - The existing user data.
 * @returns A Promise that resolves to the updated user or an error object.
 */
export async function updateUserAccount(
  payload: UserInput,
  userData: User
): Promise<ReturnType<User>> {
  if (payload.username && (await findByUsername(payload.username)))
    return {data: null, error: ERRORS.badRequest(["Username already in use"])}

  const user = await db.user.update({
    where: {
      id: userData.id,
    },
    data: {
      name: payload.name,
      password: payload.password,
      username: payload.username,
      bio: payload.bio,
      image: payload.image,
    },
  })
  return {data: user, error: null}
}

/**
 * Deletes a user from the database.
 * @param id - The ID of the user to delete.
 * @returns A Promise that resolves to a success message or an error object.
 */
export async function deleteUser(userData: User): Promise<ReturnType<User>> {
  const deletedUser = await db.user.delete({
    where: {
      id: userData.id,
    },
  })
  if (!deletedUser) return {data: null, error: ERRORS.badRequest(["Username already in use"])}

  return {data: deletedUser, error: null}
}
