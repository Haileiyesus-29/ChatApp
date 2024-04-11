import db from "@/config/db"
import {ReturnType} from "@/utils/types"
import {Channel, Group, User} from "@prisma/client"

export async function searchUserAccount(query: string): Promise<ReturnType<User[]>> {
  const results = await db.user.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    take: 10,
  })

  return {data: results, error: null}
}

export async function searchChannel(query: string): Promise<ReturnType<Channel[]>> {
  const results = await db.channel.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10,
  })

  return {data: results, error: null}
}

export async function searchGroup(query: string): Promise<ReturnType<Group[]>> {
  const results = await db.group.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10,
  })

  return {data: results, error: null}
}

export async function searchAll(query: string): Promise<ReturnType<any>> {
  const userPromise = searchUserAccount(query)
  const channelPromise = searchChannel(query)
  const groupPromise = searchGroup(query)

  const [users, channels, groups] = await Promise.all([userPromise, channelPromise, groupPromise])

  return {data: {users: users.data, channels: channels.data, groups: groups.data}, error: null}
}
