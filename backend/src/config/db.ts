import {PrismaClient} from "@prisma/client"

type PrismaInstance = PrismaClient

let prismaInstance: PrismaInstance | null = null

const getPrismaInstance = (): PrismaClient => {
  if (!prismaInstance) return new PrismaClient()
  return prismaInstance
}

const db = getPrismaInstance()

export default db
