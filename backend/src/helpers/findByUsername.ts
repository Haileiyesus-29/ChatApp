import {Channel, Group, User} from "@prisma/client"
import db from "@/config/db"

async function findByUsername(username: string): Promise<User | Group | Channel | null> {
  const findFromUsers = db.user.findFirst({where: {username}})
  const findFromChannels = db.channel.findFirst({where: {username}})
  const findFromGroups = db.group.findFirst({where: {username}})

  const account: [User | null, Channel | null, Group | null] = await Promise.all([
    findFromUsers,
    findFromChannels,
    findFromGroups,
  ])

  return account[0] || account[1] || account[2]
}

export default findByUsername
