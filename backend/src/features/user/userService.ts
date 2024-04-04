import bcrypt from "bcryptjs"
import {User} from "@prisma/client"
import db from "@/config/db"
import findByUsername from "@/helpers/findByUsername"
import {AccountResponse, ReturnType} from "@/utils/types"
import {ERRORS} from "@/utils/errors"
import hashPassword from "@/helpers/hashPassword"
import removePassword from "@/helpers/removePassword"
import {channel} from "diagnostics_channel"

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
 * Finds a user by their ID.
 * @param id - The ID of the user to find.
 * @returns A Promise that resolves to the found user or an error object.
 */
export async function findUserById(id: string): Promise<ReturnType<AccountResponse>> {
  const user = await db.user.findFirst({
    where: {
      id,
    },
  })
  if (!user) return {data: null, error: ERRORS.notFound(["User not found"])}

  return {data: removePassword(user), error: null}
}

/**
 * Updates a user's account information.
 * @param payload - The updated user data.
 * @param userData - The existing user data.
 * @returns A Promise that resolves to the updated user or an error object.
 */
export async function updateUserAccount(
  userData: User,
  payload: UserInput
): Promise<ReturnType<AccountResponse>> {
  if (payload.username && (await findByUsername(payload.username)))
    return {data: null, error: ERRORS.badRequest(["Username already in use"])}

  let hashedPassword: string | undefined
  if (payload.password) {
    hashedPassword = await hashPassword(payload.password)
  }
  const user = await db.user.update({
    where: {
      id: userData.id,
    },
    data: {
      name: payload.name,
      password: hashedPassword,
      username: payload.username,
      bio: payload.bio,
      image: payload.image,
    },
  })

  return {data: removePassword(user), error: null}
}

/**
 * Deletes a user from the database.
 * @param id - The ID of the user to delete.
 * @returns A Promise that resolves to a success message or an error object.
 */
export async function deleteUser(
  userData: User,
  payload: {password: string}
): Promise<ReturnType<User>> {
  const password = payload?.password
  if (!password) {
    return {data: null, error: ERRORS.badRequest(["Password is required"])}
  }

  const user = await db.user.findFirst({
    where: {
      id: userData.id,
    },
  })

  const isPasswordValid = await bcrypt.compare(password, user?.password!)

  if (!isPasswordValid) {
    return {data: null, error: ERRORS.forbidden(["Invalid Credentials"])}
  }

  // BUG: Can't fix error for batch update
  try {
    await db.$transaction(async db => {
      // 1, Delete the user
      const deletedUser = await db.user.delete({
        where: {
          id: userData.id,
        },
        select: {
          ownChannels: {
            select: {
              id: true,
              members: {
                select: {
                  id: true,
                },
              },
            },
          },
          ownGroups: {
            select: {
              id: true,
              members: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      })

      const listOfChannels = deletedUser.ownChannels.map(channel => channel.id)
      const listOfGroups = deletedUser.ownGroups.map(group => group.id)
      const listOfChannelMembers = deletedUser.ownChannels
      const listOfGroupMembers = deletedUser.ownGroups

      const batchUpdateChannelMembers = listOfChannelMembers
        .map(channel => {
          const upateFunctions: (() => Promise<any>)[] = [] // Change the type of upateFunctions to an array of functions
          for (const member of channel.members) {
            upateFunctions.push(() =>
              db.user.update({
                where: {
                  id: member.id,
                },
                data: {
                  channels: {
                    disconnect: {
                      id: channel.id,
                    },
                  },
                },
              })
            )
          }
          return upateFunctions
        })
        .flat()

      const batchUpdateGroupMembers = listOfGroupMembers.map(group => {
        const upateFunctions: (() => Promise<any>)[] = [] // Change the type of upateFunctions to an array of functions
        for (const member of group.members) {
          upateFunctions.push(() =>
            db.user.update({
              where: {
                id: member.id,
              },
              data: {
                groups: {
                  disconnect: {
                    id: group.id,
                  },
                },
              },
            })
          )
        }
        return upateFunctions
      })

      // Update all members of the deleted channels and groups
      await Promise.all(batchUpdateChannelMembers)
      await Promise.all(batchUpdateGroupMembers)

      // 2, Delete channels created by the user
      await db.channel.deleteMany({
        where: {
          id: {
            in: listOfChannels,
          },
        },
      })

      // 3, Delete groups created by the user
      await db.group.deleteMany({
        where: {
          id: {
            in: listOfGroups,
          },
        },
      })

      // 4, Update all messages from the user, userChannels, and userGroups
      await db.message.deleteMany({
        where: {
          OR: [
            {userSenderId: userData.id},
            {userRecId: userData.id},
            {groupRecId: {in: listOfGroups}},
            {chanSenderId: {in: listOfChannels}},
          ],
        },
      })
    })
  } catch (error: any) {
    console.error("Error occurred during user deletion:", error)
    return {data: null, error: ERRORS.serverFailure([error?.message || "Failed to delete"])}
  }

  return {data: userData, error: null}
}
