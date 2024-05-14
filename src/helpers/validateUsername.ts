export default function validateUsername(username: string): boolean {
  const validUsername = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/
  return validUsername.test(username)
}
