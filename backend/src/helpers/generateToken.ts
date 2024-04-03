import jwt from "jsonwebtoken"

export default async function generateToken(id: string): Promise<string> {
  const secretKey = process.env.JWT_SECRET_KEY
  if (!secretKey) {
    throw new Error("JWT secret key is not defined")
  }
  return await jwt.sign({id}, secretKey, {
    expiresIn: "1d",
  })
}
