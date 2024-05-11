const cookieConfig = () => ({
  httpOnly: true,
  sameSite: "none",
  path: "/api/auth/verify",
  secure: true,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
})
export default cookieConfig
