import {Channel, Group, User} from "@prisma/client"
import db from "../config/db"

async function findById(id: string): Promise<User | Group | Channel | null> {
  const findFromUsers = db.user.findFirst({where: {id}})
  const findFromChannels = db.channel.findFirst({where: {id}})
  const findFromGroups = db.group.findFirst({where: {id}})

  const account: [User | null, Channel | null, Group | null] = await Promise.all([
    findFromUsers,
    findFromChannels,
    findFromGroups,
  ])

  return account[0] || account[1] || account[2]
}

export default findById
