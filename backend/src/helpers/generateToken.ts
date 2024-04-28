import jwt from "jsonwebtoken"

export default async function generateToken(
  id: string,
  type: "access" | "refresh" = "access"
): Promise<string> {
  let token: string

  if (type === "access") {
    token = jwt.sign({id}, process.env.JWT_SECRET_KEY!, {
      expiresIn: "15m",
    })
  } else {
    token = jwt.sign({id}, process.env.JWT_REFRESH_KEY!, {
      expiresIn: "7d",
    })
  }

  return token
}
