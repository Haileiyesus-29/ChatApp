import {PrismaClient} from "@prisma/client"

let prismaInstance: PrismaClient | null = null

const getPrismaInstance = (): PrismaClient => {
  if (!prismaInstance) return new PrismaClient()
  return prismaInstance
}

const db = getPrismaInstance()

export default db
